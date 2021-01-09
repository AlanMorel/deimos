import * as net from "net";
import { BitConverter } from "../crypto/BitConverter";
import { BufferStream } from "../crypto/BufferStream";
import { Cipher } from "../crypto/Cipher";
import { RequestVersionPacket } from "../packets/RequestVersionPacket";
import { Packet } from "../tools/Packet";
import { PacketReader } from "../tools/PacketReader";

export class Session {
    private static version: number = 12;
    private static blockIV: number = 12;

    public id: number;
    public socket: net.Socket;

    private recvCipher: Cipher;
    private sendCipher: Cipher;

    private bufferStream: BufferStream;

    constructor(id: number, socket: net.Socket) {
        this.id = id;
        this.socket = socket;

        const ivRecv = BitConverter.toInt(Cipher.generateIv());
        const ivSend = BitConverter.toInt(Cipher.generateIv());

        this.recvCipher = Cipher.decryptor(Session.version, ivRecv, Session.blockIV);
        this.sendCipher = Cipher.encryptor(Session.version, ivSend, Session.blockIV);

        this.bufferStream = new BufferStream();

        this.sendHandshake(0, ivRecv, ivSend);
    }

    public send(packet: Packet): void {
        packet = this.sendCipher.transform(packet.buffer);

        console.log("[SEND]: " + packet.toString());

        this.socket.write(packet.toArray());
    }

    public sendHandshake(type: number, ivRecv: number, ivSend: number): void {
        let packet = RequestVersionPacket.handshake(Session.version, ivRecv, ivSend, Session.blockIV, type);
        packet = this.sendCipher.writeHeader(packet.toArray());

        console.log("[HANDSHAKE]: " + packet.toString());

        this.socket.write(packet.buffer);
    }

    public onData(data: Buffer): void {

        this.bufferStream.write(data);

        let buffer = this.bufferStream.read();
        while (buffer !== null) {
            const packet = this.recvCipher.transform(buffer);
            const reader = new PacketReader(packet.buffer);

            console.log("[RECV]: " + packet.toString());

            const opcode = reader.readShort();
            // TODO: handle incoming packet

            buffer = this.bufferStream.read();
        }
    }
}