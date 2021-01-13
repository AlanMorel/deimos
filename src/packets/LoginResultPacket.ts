import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { Time } from "../tools/Time";

enum Mode {
    SUCCESS = 0x0
}

export class LoginResultPacket {

    public static login(accountId: BigInt): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.LOGIN_RESULT);
        packet.writeByte(Mode.SUCCESS);
        packet.writeInt(); // constant
        packet.writeUnicodeString(""); // ban reason
        packet.writeBigInt(accountId);
        packet.writeLong(Time.getUnixTimeSeconds()); // SyncTime
        packet.writeInt(Time.getTicks()); // SyncTicks
        packet.writeByte(); // TimeZone
        packet.writeByte(); // BlockType
        packet.writeInt(); // constant
        packet.writeLong(); // constant
        packet.writeInt(0x2); // constant

        return packet;
    }
}
