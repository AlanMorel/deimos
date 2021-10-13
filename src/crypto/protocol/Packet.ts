export class Packet {
    public buffer: Buffer;
    public length: number;

    public constructor(buffer: Buffer) {
        this.buffer = buffer;
        this.length = buffer.length;
    }

    public toString(): string {
        return this.toArray()
            .toString("hex")
            .substring(4)
            .toUpperCase()
            .replace(/(.)(.)/g, "$1$2 ");
    }

    public toArray(): Buffer {
        const buffer = Buffer.alloc(this.length);
        this.buffer.copy(buffer);
        return buffer;
    }
}
