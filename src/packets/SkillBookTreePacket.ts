import { SendOp } from "../constants/SendOp";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { Player } from "../types/player/Player";

export class SkillBookTreePacket {
    public static openSkillBook(player: Player): PacketWriter {
        const packetWriter: PacketWriter = new PacketWriter();
        packetWriter.writeShort(SendOp.SKILL_BOOK_TREE);

        packetWriter.write(Buffer.from([0x00]));
        packetWriter.writeInt(player.skillTabs.length);
        packetWriter.writeBigInt(player.activeSkillTabId);
        packetWriter.writeInt(player.skillTabs.length);

        for (const skillTab of player.skillTabs) {
            packetWriter.writeBigInt(skillTab.tabId);
            packetWriter.writeUnicodeString(skillTab.name);

            const skills: Map<number, number> = new Map(
                [...skillTab.skillLevels.entries()].filter(entry => entry[1] > 0)
            );
            packetWriter.writeInt(skills.size);
            for (const [key, value] of skills.entries()) {
                packetWriter.writeInt(key);
                packetWriter.writeInt(value);
            }
        }

        return packetWriter;
    }
}
