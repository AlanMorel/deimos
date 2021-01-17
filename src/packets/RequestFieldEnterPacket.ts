import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { CoordF } from "../types/coords/CoordF";
import { Player } from "../types/player/Player";

enum Mode {
    ENTER = 0x0,
}

export class RequestFieldEnterPacket {

    public static requestEnter(player: Player): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.REQUEST_FIELD_ENTER);
        packet.writeByte(Mode.ENTER);
        packet.writeInt(player.mapId);
        packet.writeByte();
        packet.writeByte();
        packet.writeInt();
        packet.writeInt();
        CoordF.write(packet, player.coord);
        CoordF.write(packet, player.rotation);
        packet.writeInt(); // whatever is here seems to be repeated by client in FIELD_ENTER response.

        return packet;
    }
}
