import { SendOp } from "@/constants/SendOp";
import { Packet } from "@/crypto/protocol/Packet";
import { PacketWriter } from "@/crypto/protocol/PacketWriter";
import { CurrencyType } from "@/types/player/CurrencyType";

export class WalletPacket {
    public static update(type: CurrencyType, amount: BigInt): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.MONEY_TOKEN);
        packet.writeByte(type);
        packet.writeBigInt(amount);
        packet.writeLong(-1); // always the same?
        packet.writeShort(52); // always the same?
        packet.writeLong();
        packet.writeShort();

        return packet;
    }
}
