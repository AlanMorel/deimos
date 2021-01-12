export class BitConverter {

    public static getBytes(int: number): Buffer {
        const buffer = Buffer.alloc(8);
        buffer[0] = int;
        buffer[1] = int >> 8;
        buffer[2] = int >> 16;
        buffer[3] = int >> 24;
        return buffer;
    }

    public static toInt(buffer: Buffer): number {
        return (buffer[0] | buffer[1] << 8 | buffer[2] << 16 | buffer[3] << 24) >>> 0;
    }

    public static toInt32(buffer: Buffer, startIndex: number): number {
        return buffer.readInt32LE(startIndex);
    }

    public static toInt16(buffer: Buffer, startIndex: number): number {
        return buffer.readInt16LE(startIndex);
    }

    public static toUInt64(buffer: Buffer, startIndex: number): bigint {
        return buffer.readBigUInt64LE(startIndex);
    }
}
