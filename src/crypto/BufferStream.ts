import { BitConverter } from "./BitConverter";

export class BufferStream {
    private DEFAULT_SIZE: number = 1 << 12;
    private HEADER_SIZE: number = 6;

    private buffer: Buffer = Buffer.alloc(this.DEFAULT_SIZE);
    private cursor: number = 0;

    public write(packet: Buffer): void {
        const offset = 0;
        const length = packet.length;

        if (this.buffer.length - this.cursor < length) {
            let newSize = this.buffer.length * 2;
            while (newSize < this.cursor + length) {
                newSize *= 2;
            }
            let newBuffer = Buffer.alloc(newSize);
            this.buffer.copy(newBuffer, 0, 0, this.cursor);
            this.buffer = newBuffer;
        }
        packet.copy(this.buffer, this.cursor, offset, this.cursor + length);
        this.cursor += length;
    }

    public tryRead(): Buffer | null {
        if (this.cursor < this.HEADER_SIZE) {
            return null;
        }

        let packetSize = BitConverter.toInt32(this.buffer, 2);
        let bufferSize = this.HEADER_SIZE + packetSize;
        if (this.cursor < bufferSize) {
            return null;
        }

        let packet = Buffer.alloc(bufferSize);
        this.buffer.copy(packet, 0, 0, bufferSize);

        this.cursor -= bufferSize;
        this.buffer.copy(this.buffer, 0, bufferSize, this.cursor);

        return packet;
    }
}
