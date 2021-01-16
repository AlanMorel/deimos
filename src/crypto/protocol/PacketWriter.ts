import * as zlib from "zlib";
import { BitConverter } from "../BitConverter";
import { Packet } from "./Packet";

export class PacketWriter extends Packet {

    private static readonly DEFAULT_SIZE: number = 1 << 6;

    public constructor(size: number = PacketWriter.DEFAULT_SIZE) {
        super(Buffer.alloc(size));
        this.length = 0;
    }

    public getRemaining(): number {
        return this.buffer.length - this.length;
    }

    private ensureCapacity(length: number): void {
        if (length <= this.getRemaining()) {
            return;
        }
        let newSize = this.length * 2;
        while (newSize < this.length + length) {
            newSize *= 2;
        }
        this.resizeBuffer(newSize);
    }

    public resizeBuffer(newSize: number): void {
        const newBuffer = Buffer.alloc(newSize);
        this.buffer.copy(newBuffer);
        this.buffer = newBuffer;
    }

    public seek(position: number): void {
        if (position < 0 || position > this.buffer.length) {
            return;
        }

        this.length = position;
    }

    public write(buffer: Buffer): void {
        for (const byte of new Int8Array(buffer)) {
            this.writeByte(byte);
        }
    }

    public writeBytes(...bytes: number[]): void {
        this.write(Buffer.from(bytes));
    }

    public writeString(buffer: Buffer): void {
        for (const short of new Int16Array(buffer)) {
            this.writeShort(short);
        }
    }

    public writeBoolean(bool: boolean): void {
        this.writeByte(bool ? 1 : 0);
    }

    public writeByte(byte: number = 0): void {
        this.ensureCapacity(1);
        this.buffer.writeIntLE(byte, this.length, 1);
        this.length += 1;
    }

    public writeShort(short: number = 0): void {
        this.ensureCapacity(2);
        this.buffer.writeInt16LE(short, this.length);
        this.length += 2;
    }

    public writeUShort(uShort: number = 0): void {
        this.ensureCapacity(2);
        this.buffer.writeUInt16LE(uShort, this.length);
        this.length += 2;
    }

    public writeInt(int: number = 0): void {
        this.ensureCapacity(4);
        this.buffer.writeInt32LE(int, this.length);
        this.length += 4;
    }

    public writeUInt(uInt: number = 0): void {
        this.ensureCapacity(4);
        this.buffer.writeUInt32LE(uInt, this.length);
        this.length += 4;
    }

    public writeLong(long: number = 0): void {
        this.ensureCapacity(8);
        this.buffer.writeBigInt64LE(BigInt(long), this.length);
        this.length += 8;
    }

    public writeBigInt(long: BigInt = BigInt(0)): void {
        this.ensureCapacity(8);
        this.buffer.writeBigInt64LE(BigInt(long), this.length);
        this.length += 8;
    }

    public writeFloat(float: number = 0): void {
        const int = BitConverter.floatToInt(float);
        this.writeInt(int);
    }

    public writeUnicodeString(str: string = ""): void {
        this.writeShort(str.length);
        this.writeString(Buffer.from(str, "utf-8"));
    }

    public writeMapleString(str: string = ""): void {
        this.write(Buffer.from(str, "utf-8"));
    }

    public writeHexString(value: string = ""): void {
        value = value.replace(/\s/g, "");
        this.write(Buffer.from(value, "hex"));
    }

    public writeIntBigEndian(int: number): void {
        this.writeByte(int >> 24);
        this.writeByte(int >> 16);
        this.writeByte(int >> 8);
        this.writeByte(int & 0xFF);
    }

    public writeDeflated(data: Buffer, length: number): Promise<void> {
        const INT_SIZE = 4;

        return new Promise(resolve => {

            if (length <= 4) {
                this.writeInt(length);
                this.write(data);
                resolve();
                return;
            }

            const deflater = zlib.createDeflate({
                level: 1
            });

            const chunks: Buffer[] = [];
            let chunkLengthTotal = 0;

            deflater.on("data", (chunk: Buffer) => {
                chunks.push(chunk);
                chunkLengthTotal += chunk.length;
            });

            deflater.on("end", () => {
                const buffer = Buffer.alloc(chunkLengthTotal);
                let offset = 0;
                chunks.forEach((chunk: Buffer) => {
                    const length = chunk.length;
                    chunk.copy(buffer, offset, 0, length);
                    offset += length;
                });

                const startIndex = this.length;

                this.writeInt();
                this.writeIntBigEndian(length);
                this.write(buffer);

                const endIndex = this.length;

                this.seek(startIndex);
                this.writeInt(endIndex - startIndex - INT_SIZE);
                this.seek(endIndex);

                deflater.removeAllListeners();
                resolve();
            });

            deflater.write(data, "hex");

            deflater.end();
        });
    }
}
