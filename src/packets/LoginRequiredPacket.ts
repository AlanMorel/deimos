import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";

export class LoginRequiredPacket {

    public static loginRequired(accountId: BigInt): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.LOGIN_REQUIRED);
        packet.writeByte(0x17); // mode
        packet.writeBigInt(accountId);
        packet.writeInt();
        packet.writeByte();
        packet.writeLong();
        packet.writeInt(0x1);
        packet.writeInt();
        packet.writeInt();
        packet.writeLong();

        return packet;
    }
}
