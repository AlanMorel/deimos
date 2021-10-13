import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { Wallet } from "../types/player/Wallet";

export class MeretsPacket {
    public static update(wallet: Wallet): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.MERET);
        packet.writeBigInt(wallet.meret.amount);
        packet.writeLong();
        packet.writeLong();
        packet.writeLong();
        packet.writeLong();

        return packet;
    }
}
