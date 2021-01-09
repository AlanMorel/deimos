import { Socket } from 'net';
import { RecvOp } from '../constants/RecvOp';
import { SendOp } from '../constants/SendOp';
import { BitConverter } from "../crypto/BitConverter";
import { BufferStream } from "../crypto/BufferStream";
import { Cipher } from "../crypto/Cipher";
import { RequestVersionPacket } from "../packets/RequestVersionPacket";
import { Packet } from "../tools/Packet";
import { PacketReader } from "../tools/PacketReader";

export class Session {

    private static readonly version: number = 12;
    private static readonly blockIV: number = 12;

    public id: number;
    public socket: Socket;

    private recvCipher: Cipher;
    private sendCipher: Cipher;

    private bufferStream: BufferStream;

    public constructor(id: number, socket: Socket) {
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

        const opcode = SendOp[BitConverter.toInt16(packet.buffer, 0)];

        console.log("SEND (" + opcode + "): " + packet.toString());

        this.socket.write(packet.toArray());
    }

    public sendHandshake(type: number, ivRecv: number, ivSend: number): void {
        let packet = RequestVersionPacket.handshake(Session.version, ivRecv, ivSend, Session.blockIV, type);
        packet = this.sendCipher.writeHeader(packet.toArray());

        console.log("HANDSHAKE: " + packet.toString());

        this.socket.write(packet.buffer);
    }

    public onData(data: Buffer): void {

        this.bufferStream.write(data);

        let buffer = this.bufferStream.read();

        while (buffer !== null) {
            const packet = this.recvCipher.transform(buffer);
            const reader = new PacketReader(packet.buffer);

            const opcode = RecvOp[reader.readShort()];

            console.log("RECV (" + opcode + "): " + packet.toString());

            // TODO: handle incoming packet

            buffer = this.bufferStream.read();
        }
    }
}