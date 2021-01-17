import { BitConverter } from "./BitConverter";

export class Stream {

    private static readonly DEFAULT_SIZE: number = 1 << 12;
    private static readonly HEADER_SIZE: number = 6;

    private buffer: Buffer = Buffer.alloc(Stream.DEFAULT_SIZE);
    private cursor: number = 0;

    public write(packet: Buffer): void {

        if (this.buffer.length - this.cursor < packet.length) {
            let newSize = this.buffer.length * 2;
            while (newSize < this.cursor + packet.length) {
                newSize *= 2;
            }
            const newBuffer = Buffer.alloc(newSize);
            this.buffer.copy(newBuffer, 0, 0, this.cursor);
            this.buffer = newBuffer;
        }

        packet.copy(this.buffer, this.cursor, 0, this.cursor + packet.length);

        this.cursor += packet.length;
    }

    public read(): Buffer | null {
        if (this.cursor < Stream.HEADER_SIZE) {
            return null;
        }

        const packetSize = BitConverter.toInt32(this.buffer, 2);
        const bufferSize = Stream.HEADER_SIZE + packetSize;

        if (this.cursor < bufferSize) {
            return null;
        }

        const packet = Buffer.alloc(bufferSize);
        this.buffer.copy(packet, 0, 0, bufferSize);

        this.cursor -= bufferSize;
        this.buffer.copy(this.buffer, 0, bufferSize, this.cursor + bufferSize);

        return packet;
    }
}
