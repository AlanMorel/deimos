import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { Time } from "../tools/Time";
import { SkinColor } from "../types/color/SkinColor";
import { CoordF } from "../types/coords/CoordF";
import { Mount } from "../types/Mount";
import { Player } from "../types/player/Player";
import { FieldPacket } from "./FieldPacket";
import { CharacterListPacketHelper } from "./helpers/CharacterListPacketHelper";
import { ItemPacketHelper } from "./helpers/ItemPacketHelper";
import { JobPacket } from "./JobPacket";

export class FieldAddUserPacket {

    public static addPlayer(player: Player): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.FIELD_ADD_USER);
        packet.writeInt(player.objectId);

        CharacterListPacketHelper.writeCharacter(packet, player);

        // Skills
        packet.writeInt(player.getJobId());
        packet.writeByte(1);
        packet.writeInt(player.jobGroupId);
        JobPacket.writeSkills(packet, player);

        // Coords
        CoordF.write(packet, player.coord);
        CoordF.write(packet, player.rotation);

        packet.writeByte();

        FieldPacket.writeTotalStats(packet, player.stats);

        packet.writeByte();
        packet.writeByte();
        packet.writeInt();
        packet.writeLong();
        packet.writeLong();

        // ???

        const flagA = false;
        packet.writeBoolean(flagA);
        if (flagA) {
            packet.writeLong();
            packet.writeUnicodeString("");
            packet.writeUnicodeString("");
            packet.writeByte();
            packet.writeInt();
            packet.writeLong();
            packet.writeLong();
            packet.writeUnicodeString("");
            packet.writeLong();
            packet.writeUnicodeString("");
            packet.writeByte();
        }

        packet.writeInt(1);

        SkinColor.write(packet, player.skinColor);
        packet.writeUnicodeString(player.profileUrl);

        packet.writeBoolean(player.mount != null);
        if (player.mount != null) {
            Mount.write(packet, player.mount);

            // Unknown
            const countA = 0;
            packet.writeByte(countA);
            for (let i = 0; i < countA; i++) {
                packet.writeInt();
                packet.writeByte();
            }
        }

        packet.writeInt();
        packet.writeLong(Time.getUnixTimeSeconds());
        packet.writeInt();
        packet.writeInt();

        // This seems to be character appearance encoded as a blob
        const encodeAppearance = true;
        packet.writeBoolean(encodeAppearance);
        if (encodeAppearance) {

            const appearanceBuffer = FieldAddUserPacket.getAppearanceBuffer(packet, player);
            packet.writeDeflated(appearanceBuffer.buffer, appearanceBuffer.length);

            packet.writeByte(); // Separator?

            packet.writeDeflated(Buffer.from([1]), 1); // Unknown

            packet.writeByte(); // Separator?

            packet.writeDeflated(Buffer.from([1]), 1); // Badge appearances

            FieldPacket.writePassiveSkills(packet);

            packet.writeInt();
            packet.writeInt();
            packet.writeByte();
            packet.writeInt();
            packet.writeByte();
            packet.writeByte();
            packet.writeInt(player.titleId);
            packet.writeShort(player.insigniaId);
            packet.writeByte();
            packet.writeInt();
            packet.writeByte();
            packet.writeLong(); // another timestamp
            packet.writeBigInt(BigInt(Number.MAX_SAFE_INTEGER));
            packet.writeByte();
            packet.writeInt();
            packet.writeInt();
            packet.writeShort();
        } else {
            // packet.writeInt(); commented out to remove warning
        }

        return packet;
    }

    private static getAppearanceBuffer(packet: PacketWriter, player: Player): PacketWriter {
        const appearanceBuffer = new PacketWriter();

        appearanceBuffer.writeByte(player.equips.size);
        for (const [slot, equip] of player.equips.entries()) {
            ItemPacketHelper.writeEquip(appearanceBuffer, slot, equip);
        }

        appearanceBuffer.writeByte(1);
        appearanceBuffer.writeLong();
        appearanceBuffer.writeLong();
        appearanceBuffer.writeByte();

        return appearanceBuffer;
    }
}
