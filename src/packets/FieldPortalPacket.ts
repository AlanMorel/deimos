import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { Portal } from "../server/fields/Portal";
import { CoordF } from "../types/coords/CoordF";

enum Mode {
    ADD = 0x0
}

export class FieldPortalPacket {

    public static addPortal(portal: Portal): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.FIELD_PORTAL);
        packet.writeByte(Mode.ADD);
        packet.writeInt(portal.id);
        packet.writeBoolean(true); // TODO: portal.isVisible
        packet.writeBoolean(true); // TODO: portal.isEnabled
        CoordF.write(packet, portal.coord);
        CoordF.write(packet, portal.rotation);
        CoordF.write(packet, new CoordF(200, 200, 250)); // not sure (200, 200, 250) was used a lot
        packet.writeUnicodeString("");
        packet.writeInt(portal.targetMapId);
        packet.writeInt(portal.objectId);
        packet.writeInt();
        packet.writeBoolean(true); // TODO: portal.isEnabled
        packet.writeLong();
        packet.writeByte();
        packet.writeInt();
        packet.writeShort();
        packet.writeInt();
        packet.writeBoolean(false);
        packet.writeUnicodeString("");
        packet.writeUnicodeString("");
        packet.writeUnicodeString("");

        return packet;
    }
}
