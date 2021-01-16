import { Socket } from "net";
import { RecvOp } from "../../constants/RecvOp";
import { SendOp } from "../../constants/SendOp";
import { BitConverter } from "../../crypto/BitConverter";
import { BufferStream } from "../../crypto/BufferStream";
import { Cipher } from "../../crypto/cipher/Cipher";
import { RecvCipher } from "../../crypto/cipher/RecvCipher";
import { SendCipher } from "../../crypto/cipher/SendCipher";
import { Packet } from "../../crypto/protocol/Packet";
import { PacketReader } from "../../crypto/protocol/PacketReader";
import { RequestVersionPacket } from "../../packets/RequestVersionPacket";
import { HexColor } from "../../tools/HexColor";
import { Logger } from "../../tools/Logger";
import { PacketRouter } from "../routers/PacketRouter";

export abstract class Session {

    private static readonly version: number = 12;
    private static readonly blockIV: number = 12;

    public id: number;
    public socket: Socket;

    private recvCipher: RecvCipher;
    private sendCipher: SendCipher;

    private stream: BufferStream;
    private packetRouter: PacketRouter;

    public constructor(id: number, socket: Socket, packetRouter: PacketRouter) {
        this.id = id;
        this.socket = socket;
        this.packetRouter = packetRouter;

        const ivRecv = BitConverter.toInt(Cipher.generateIv());
        const ivSend = BitConverter.toInt(Cipher.generateIv());

        this.recvCipher = new RecvCipher(Session.version, ivRecv, Session.blockIV);
        this.sendCipher = new SendCipher(Session.version, ivSend, Session.blockIV);

        this.stream = new BufferStream();

        this.sendHandshake(0, ivRecv, ivSend);
    }

    public send(packet: Packet): void {
        const opcode = BitConverter.toInt16(packet.buffer, 0);
        const sendOpcode = SendOp[opcode];

        switch (opcode) {
            case SendOp.USER_SYNC:
            case SendOp.USER_CHAT:
            case SendOp.NPC_CONTROL:
            case SendOp.CHARACTER_LIST:
            case SendOp.KEY_TABLE:
            case SendOp.PROXY_GAME_OBJ:
            case SendOp.STAT:
            case SendOp.EMOTION:
            case SendOp.ITEM_INVENTORY:
            case SendOp.FIELD_PORTAL:
            case SendOp.FIELD_ADD_USER:
                /*
                case SendOp.FIELD_ENTRANCE:
                case SendOp.SERVER_ENTER:
                */
                break;
            default:
                Logger.log("[SEND] " + sendOpcode + ": " + packet.toString(), HexColor.RED);
                break;
        }

        packet = this.sendCipher.encrypt(packet.buffer);
        this.socket.write(packet.toArray());
    }

    public sendHandshake(type: number, ivRecv: number, ivSend: number): void {
        let packet = RequestVersionPacket.handshake(Session.version, ivRecv, ivSend, Session.blockIV, type);
        packet = this.sendCipher.writeHeader(packet.toArray());

        Logger.log("[HANDSHAKE]: " + packet.toString(), HexColor.PURPLE);

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

        switch (opcode) {
            case RecvOp.USER_SYNC:
            case RecvOp.USER_CHAT:
            case RecvOp.KEY_TABLE:
            case RecvOp.LOG_SEND:
            case RecvOp.NAMETAG_SYMBOL:
                break;
            default:
                Logger.log("[RECV] " + recvOpcode + ": " + packet.toString(), HexColor.GREEN);
                break;
        }

        // TODO: log unknowns
        // Logger.log("[RECV] 0x" + opcode.toString(16).toUpperCase() + ": " + packet.toString(), HexColor.GREEN);

        const packetHandler = this.packetRouter.getHandler(opcode);

        if (packetHandler) {
            packetHandler.handle(this, reader);
        }
    }
}