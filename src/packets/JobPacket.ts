import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { Player } from "../types/player/Player";

export class JobPacket {

    public static writeSkills(packet: PacketWriter, character: Player): void {
        // Get skills
        const skillTab = character.skillTabs[0];

        if (character.skillTabs.length > 0) { // TODO: populate skill tabs so you don't need to hardcode this
            const skills = skillTab.skills; // Get first skill tab skills only for now, uncertain of how to have multiple skill tabs

            // Ordered list of skill ids (must be sent in this order)
            const ids = skillTab.order;
            const split = skillTab.split;
            const countId = ids[ids.length - split]; // Split to last skill id
        }

        const skillIds = [10500101, 10500152, 10500221, 10500051, 10500153, 10500171, 10500001, 10500291, 10500172, 10500241, 20000011, 10500173, 10500191, 10500021, 10500174, 10500141, 10500192, 10500243, 10500091, 10500193, 10500261, 10500041, 10500211, 10500093, 10500144, 10500281, 10500231, 20000001, 10500061, 10500181, 10500011, 10500081, 10500031, 10500065, 10500151, 10500067, 10500271, 10500121, 10500292, 10500071, 10500293, 10500161, 10500111, 10500232, 10500131, 10500063, 10500251, 10500064, 10500201];
        const split = 14;
        const countId = skillIds[skillIds.length - split];

        packet.writeByte(skillIds.length - split); // Skill count minus split

        // List of skills for given tab in format (byte zero) (byte learned) (int skill_id) (int skill_level) (byte zero)
        for (const id of skillIds) {
            if (id == countId) {
                packet.writeByte(split); // Write that there are (split) skills left
            }
            packet.writeByte();
            packet.writeByte(0); // TODO: skills.get(id)?.learned);
            packet.writeInt(id);
            packet.writeInt(1); // TODO: skills.get(id)?.level);
            packet.writeByte();
        }

        packet.writeShort(); // Ends with zero short
    }
}
