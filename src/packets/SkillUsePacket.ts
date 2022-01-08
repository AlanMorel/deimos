import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { CoordF } from "../types/coords/CoordF";
import { SkillCast } from "../types/skills/SkillCast";

export class SkillUsePacket {
    public static readonly skillCastMap: Map<BigInt, SkillCast> = new Map<BigInt, SkillCast>();

    public static skillUse(skillCast: SkillCast, position: CoordF, direction: CoordF, rotation: CoordF): Packet {
        SkillUsePacket.skillCastMap.set(skillCast.skillSN, skillCast);

        const packetWriter = new PacketWriter();

        packetWriter.writeShort(SendOp.SKILL_USE);
        packetWriter.writeBigInt(skillCast.skillSN);
        packetWriter.writeInt(skillCast.serverTick);
        packetWriter.writeInt(skillCast.entityId);
        packetWriter.writeInt(skillCast.skillId);
        packetWriter.writeShort(skillCast.skillLevel);
        packetWriter.writeByte();
        CoordF.write(packetWriter, position);
        CoordF.write(packetWriter, direction);
        CoordF.write(packetWriter, rotation);
        packetWriter.writeShort();
        packetWriter.writeByte();
        packetWriter.writeByte();

        return packetWriter;
    }

    public static mobSkillUse(skillCast: SkillCast, position: CoordF, direction: CoordF, rotation: CoordF): Packet {
        SkillUsePacket.skillCastMap.set(skillCast.skillSN, skillCast);

        const packetWriter = new PacketWriter();

        packetWriter.writeShort(SendOp.SKILL_USE);

        return packetWriter;
    }
}
