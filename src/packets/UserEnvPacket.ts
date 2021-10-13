import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";

export class UserEnvPacket {
    public static setTitles(titles: number[]): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.USER_ENV);
        packet.writeByte(0x2); // mode

        packet.writeInt(titles.length);
        for (const titleId of titles) {
            packet.writeInt(titleId);
        }

        return packet;
    }

    public static send04(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.USER_ENV);
        packet.writeByte(0x4); // mode
        packet.writeInt();

        return packet;
    }

    public static send05(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.USER_ENV);
        packet.writeByte(0x5); // mode
        packet.writeInt();

        return packet;
    }

    public static send08(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.USER_ENV);
        packet.writeByte(0x8); // mode
        packet.writeInt();
        packet.writeInt();

        return packet;
    }

    public static send09(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.USER_ENV);
        packet.writeByte(0x9); // mode
        packet.writeInt();

        return packet;
    }

    public static send10(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.USER_ENV);
        packet.writeByte(0xa); // mode
        packet.writeInt();

        return packet;
    }

    public static send12(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.USER_ENV);
        packet.writeByte(0xc); // mode
        packet.writeInt();

        return packet;
    }
}
