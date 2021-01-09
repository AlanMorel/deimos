export class Packet {

    public buffer: Buffer;
    public length: number;

    constructor(buffer: Buffer) {
        this.buffer = buffer;
        this.length = buffer.length;
    }

    public toString(): string {
        return this.buffer.toString('hex').toUpperCase().replace(/(.)(.)/g, '$1$2 ');
    }

    public toArray(): Buffer {
        const buffer = Buffer.alloc(this.length);
        this.buffer.copy(buffer);
        return buffer;
    }
}