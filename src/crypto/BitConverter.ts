export class BitConverter {

    public static getBytes(int: number) {
        let b = Buffer.alloc(8);
        b[0] = int;
        b[1] = int >> 8
        b[2] = int >> 16
        b[3] = int >> 24
        return b
    }

    public static toInt(buffer: Buffer) {
        return (buffer[0] | buffer[1] << 8 | buffer[2] << 16 | buffer[3] << 24) >>> 0;
    }

    public static toInt32(buffer: Buffer, startIndex: number): number {
        const u32bytes = buffer.slice(startIndex, startIndex + 4);
        return new Uint32Array(u32bytes)[0];
    }
}
