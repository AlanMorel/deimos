import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { SkillMetadata } from "../data/metadata/skills/SkillMetadata";
import { Player } from "../types/player/Player";

export class JobPacket {
    public static writePassiveSkills(packet: PacketWriter, character: Player): void {
        const passiveSkillList: SkillMetadata[] = [...character.skillTabs[0].skillJob.values()].filter(
            skill => skill.type === 1 && skill.currentLevel === 1
        );

        packet.writeShort(passiveSkillList.length);

        for (const skill of passiveSkillList) {
            packet.writeInt(character.objectId);
            packet.writeInt();
            packet.writeInt(character.objectId);
            packet.writeInt();
            packet.writeInt();
            packet.writeInt(skill.skillId);
            packet.writeShort(skill.skillLevels[0].level ?? 1);
            packet.writeInt(1);
            packet.writeInt(1);
            packet.writeLong();
        }
    }

    public static sendJob(character: Player): Packet {
        const packetWriter: PacketWriter = new PacketWriter();

        packetWriter.writeShort(SendOp.JOB);
        packetWriter.writeInt(character.objectId);
        packetWriter.writeByte(2); // 2 = second job? maybe a header for awakened = true?
        packetWriter.writeShort(character.getJobCode());
        packetWriter.writeByte(1); // 1 = first Job?
        packetWriter.writeShort(character.getJobId());
        packetWriter.writeSkills(character);

        return packetWriter;
    }
}
