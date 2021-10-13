import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { Player } from "../types/player/Player";

export class FieldRemoveUserPacket {
    public static removePlayer(player: Player): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.FIELD_REMOVE_USER);
        packet.writeInt(player.objectId);

        return packet;
    }
}
