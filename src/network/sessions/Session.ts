import Configs from "@/Configs";
import { RecvOp } from "@/constants/RecvOp";
import { SendOp } from "@/constants/SendOp";
import { Cipher } from "@/crypto/cipher/Cipher";
import { RecvCipher } from "@/crypto/cipher/RecvCipher";
import { SendCipher } from "@/crypto/cipher/SendCipher";
import { Packet } from "@/crypto/protocol/Packet";
import { PacketReader } from "@/crypto/protocol/PacketReader";
import { Stream } from "@/crypto/Stream";
import { PacketRouter } from "@/network/routers/PacketRouter";
import { RequestVersionPacket } from "@/packets/RequestVersionPacket";
import { BitConverter } from "@/tools/BitConverter";
import { Logger } from "@/tools/Logger";
import { Socket } from "net";
import picocolors from "picocolors";

const { cyan } = picocolors;

export abstract class Session {
    private static readonly version: number = 12;
    private static readonly blockIV: number = 12;

    public id: number;
    public socket: Socket;

    private recvCipher: RecvCipher;
    private sendCipher: SendCipher;

    private stream: Stream = new Stream();
    private packetRouter: PacketRouter;

    public constructor(id: number, socket: Socket, packetRouter: PacketRouter) {
        this.id = id;
        this.socket = socket;
        this.packetRouter = packetRouter;

        const ivRecv = BitConverter.toInt(Cipher.generateIv());
        const ivSend = BitConverter.toInt(Cipher.generateIv());

        this.recvCipher = new RecvCipher(Session.version, ivRecv, Session.blockIV);
        this.sendCipher = new SendCipher(Session.version, ivSend, Session.blockIV);

        this.sendHandshake(0, ivRecv, ivSend);
    }

    public send(packet: Packet): void {
        const opcode = BitConverter.toInt16(packet.buffer);
        const sendOpcode = SendOp[opcode];

        if (!Configs.block.send.includes(opcode)) {
            Logger.send(sendOpcode, packet);
        }

        packet = this.sendCipher.encrypt(packet.toArray());
        this.socket.write(packet.toArray());
    }

    public sendHandshake(type: number, ivRecv: number, ivSend: number): void {
        let packet = RequestVersionPacket.handshake(Session.version, ivRecv, ivSend, Session.blockIV, type);
        packet = this.sendCipher.writeHeader(packet.toArray());

        Logger.log(`[HANDSHAKE] ${packet.toString()}`, cyan);

        this.socket.write(packet.buffer);
    }

    public onData(data: Buffer): void {
        this.stream.write(data);

        let buffer = this.stream.read();

        while (buffer !== null) {
            const packet = this.recvCipher.decrypt(buffer);

            this.handlePacket(packet);

            buffer = this.stream.read();
        }
    }

    private handlePacket(packet: Packet): void {
        const reader = new PacketReader(packet.buffer);

        const opcode = reader.readShort();
        const recvOpcode = RecvOp[opcode];

        if (recvOpcode === undefined) {
            Logger.recv(`0x${opcode.toString(16).toUpperCase()}`, packet);
            return;
        }

        if (!Configs.block.recv.includes(opcode)) {
            Logger.recv(recvOpcode, packet);
        }

        const packetHandler = this.packetRouter.getHandler(opcode);

        if (packetHandler) {
            packetHandler.handle(this, reader);
        }
    }
}
