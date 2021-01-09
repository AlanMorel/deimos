import { Socket } from "net";
import { RecvOp } from "../constants/RecvOp";
import { SendOp } from "../constants/SendOp";
import { BitConverter } from "../crypto/BitConverter";
import { BufferStream } from "../crypto/BufferStream";
import { Cipher } from "../crypto/Cipher";
import { RequestVersionPacket } from "../packets/RequestVersionPacket";
import { Packet } from "../tools/Packet";
import { PacketReader } from "../tools/PacketReader";
import { PacketRouter } from "./PacketRouter";

export class Session {

    private static readonly version: number = 12;
    private static readonly blockIV: number = 12;

    public id: number;
    public socket: Socket;

    private recvCipher: Cipher;
    private sendCipher: Cipher;

    private bufferStream: BufferStream;
    private packetRouter: PacketRouter;

    public constructor(id: number, socket: Socket, packetRouter: PacketRouter) {
        this.id = id;
        this.socket = socket;
        this.packetRouter = packetRouter;

        const ivRecv = BitConverter.toInt(Cipher.generateIv());
        const ivSend = BitConverter.toInt(Cipher.generateIv());

        this.recvCipher = Cipher.decryptor(Session.version, ivRecv, Session.blockIV);
        this.sendCipher = Cipher.encryptor(Session.version, ivSend, Session.blockIV);

        this.bufferStream = new BufferStream();

        this.sendHandshake(0, ivRecv, ivSend);
    }

    public send(packet: Packet): void {
        packet = this.sendCipher.transform(packet.buffer);

        const opcode = BitConverter.toInt16(packet.buffer, 0);
        const sendOpcode = SendOp[opcode];

        console.log("SEND (" + sendOpcode + "): " + packet.toString());

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

            const opcode = reader.readShort();
            const recvOpcode = RecvOp[opcode];

            console.log("RECV (" + recvOpcode + "): " + packet.toString());

            const packetHandler = this.packetRouter.getHandler(opcode);

            if (packetHandler) {
                packetHandler.handle(reader, this);
            }

            buffer = this.bufferStream.read();
        }
    }
}