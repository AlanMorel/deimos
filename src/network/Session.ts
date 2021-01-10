import { Socket } from "net";
import { RecvOp } from "../constants/RecvOp";
import { SendOp } from "../constants/SendOp";
import { BitConverter } from "../crypto/BitConverter";
import { BufferStream } from "../crypto/BufferStream";
import { Cipher } from "../crypto/cipher/Cipher";
import { RecvCipher } from "../crypto/cipher/RecvCipher";
import { SendCipher } from "../crypto/cipher/SendCipher";
import { Packet } from "../crypto/protocol/Packet";
import { PacketReader } from "../crypto/protocol/PacketReader";
import { RequestVersionPacket } from "../packets/RequestVersionPacket";
import { Logger } from "../tools/Logger";
import { LoggerColor } from "../tools/LoggerColor";
import { PacketRouter } from "./PacketRouter";

export class Session {

    private static readonly version: number = 12;
    private static readonly blockIV: number = 12;

    public id: number;
    public socket: Socket;

    private recvCipher: RecvCipher;
    private sendCipher: SendCipher;

    private bufferStream: BufferStream;
    private packetRouter: PacketRouter;

    public constructor(id: number, socket: Socket, packetRouter: PacketRouter) {
        this.id = id;
        this.socket = socket;
        this.packetRouter = packetRouter;

        const ivRecv = BitConverter.toInt(Cipher.generateIv());
        const ivSend = BitConverter.toInt(Cipher.generateIv());

        this.recvCipher = new RecvCipher(Session.version, ivRecv, Session.blockIV);
        this.sendCipher = new SendCipher(Session.version, ivSend, Session.blockIV);

        this.bufferStream = new BufferStream();

        this.sendHandshake(0, ivRecv, ivSend);
    }

    public send(packet: Packet): void {
        const opcode = BitConverter.toInt16(packet.buffer, 0);
        const sendOpcode = SendOp[opcode];

        Logger.log("[SEND] " + sendOpcode + ": " + packet.toString(), LoggerColor.RED);

        packet = this.sendCipher.encrypt(packet.buffer);
        this.socket.write(packet.toArray());
    }

    public sendHandshake(type: number, ivRecv: number, ivSend: number): void {
        let packet = RequestVersionPacket.handshake(Session.version, ivRecv, ivSend, Session.blockIV, type);
        packet = this.sendCipher.writeHeader(packet.toArray());

        Logger.log("[HANDSHAKE]: " + packet.toString(), LoggerColor.PURPLE);

        this.socket.write(packet.buffer);
    }

    public onData(data: Buffer): void {

        this.bufferStream.write(data);

        let buffer = this.bufferStream.read();

        while (buffer !== null) {
            const packet = this.recvCipher.decrypt(buffer);

            this.handlePacket(packet);

            buffer = this.bufferStream.read();
        }
    }

    private handlePacket(packet: Packet): void {
        const reader = new PacketReader(packet.buffer);

        const opcode = reader.readShort();
        const recvOpcode = RecvOp[opcode];

        Logger.log("[RECV] " + recvOpcode + ": " + packet.toString(), LoggerColor.GREEN);

        const packetHandler = this.packetRouter.getHandler(opcode);

        if (packetHandler) {
            packetHandler.handle(reader, this);
        }
    }
}