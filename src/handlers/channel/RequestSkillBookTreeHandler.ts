import { PacketReader } from "../../crypto/protocol/PacketReader";
import { ChannelSession } from "../../network/sessions/ChannelSession";
import { SkillBookTreePacket } from "../../packets/SkillBookTreePacket";
import { Logger } from "../../tools/Logger";
import { ChannelPacketHandler } from "../ChannelPacketHandler";

enum SkillBookMode {
    OPEN = 0x00,
    SAVE = 0x01,
    RENAME = 0x02,
    ADD_TAB = 0x04
}

export class RequestSkillBookTreeHandler implements ChannelPacketHandler {
    public handle(session: ChannelSession, packet: PacketReader): void {
        const mode: SkillBookMode = packet.readByte();

        switch (mode) {
            case SkillBookMode.OPEN:
                session.send(SkillBookTreePacket.openSkillBook(session.player));
                break;
            default:
                Logger.log("Unknown SkillBook Mode");
        }
    }
}
