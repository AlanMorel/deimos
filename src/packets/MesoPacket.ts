import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { Wallet } from "../types/player/Wallet";

export class MesoPacket {

    public static update(wallet: Wallet): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.MONEY);
        packet.writeBigInt(wallet.meso.amount);
        packet.writeInt();

        return packet;
    }
}
