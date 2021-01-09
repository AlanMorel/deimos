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
        const u32bytes = buffer.slice(startIndex, startIndex + 4);
        return new Uint32Array(u32bytes)[0];
    }

    public static toInt16(buffer: Buffer, startIndex: number): number {
        const u16bytes = buffer.slice(startIndex, startIndex + 4);
        return new Uint16Array(u16bytes)[0];
    }
}
