import { Packet } from "@/crypto/protocol/Packet";
import { BitConverter } from "@/tools/BitConverter";

export class PacketReader extends Packet {
    private position: number;

    public constructor(buffer: Buffer, skip: number = 0) {
        super(buffer);
        this.position = skip;
    }

    public readBoolean(): boolean {
        return this.readByte() === 1;
    }

    public readChar(): string {
        return String.fromCharCode(97 + this.readShort());
    }

    public readByte(): number {
        const byte = this.buffer.readIntLE(this.position, 1);
        this.position += 1;
        return byte;
    }

    public readUByte(): number {
        const uByte = this.buffer.readUIntLE(this.position, 1);
        this.position += 1;
        return uByte;
    }

    public readShort(): number {
        const short = this.buffer.readInt16LE(this.position);
        this.position += 2;
        return short;
    }

    public readUShort(): number {
        const uShort = this.buffer.readUInt16LE(this.position);
        this.position += 2;
        return uShort;
    }

    public readInt(): number {
        const int = this.buffer.readInt32LE(this.position);
        this.position += 4;
        return int;
    }

    public readUInt(): number {
        const uInt = this.buffer.readUInt32LE(this.position);
        this.position += 4;
        return uInt;
    }

    public readLong(): bigint {
        const long = this.buffer.readBigInt64LE(this.position);
        this.position += 8;
        return long;
    }

    public readULong(): bigint {
        const uLong = this.buffer.readBigUInt64LE(this.position);
        this.position += 8;
        return uLong;
    }

    public readFloat(): number {
        const int = this.readInt();
        return BitConverter.intToFloat(int);
    }

    public readAsciiString(length: number): string {
        const stringBuffer = Buffer.alloc(length);
        for (let i = 0; i < length; i++) {
            stringBuffer[i] = this.readShort();
        }
        return stringBuffer.toString("ascii");
    }

    public readUnicodeString(): string {
        const length = this.readShort();
        return this.readAsciiString(length);
    }

    public readMapleString(): string {
        const length = this.readShort();
        return this.read(length).toString("ascii");
    }

    public read(length: number): Buffer {
        const ret = Buffer.alloc(length);
        for (let i = 0; i < length; i++) {
            ret[i] = this.readByte();
        }
        return ret;
    }

    public skip(length: number): void {
        this.position += length;
    }

    public available(): number {
        return this.buffer.length - this.position;
    }
}
