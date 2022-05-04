import { PacketReader } from "../../crypto/protocol/PacketReader";
import { ChannelSession } from "../../network/sessions/ChannelSession";
import { ChannelPacketHandler } from "../ChannelPacketHandler";

export class StateSkillHandler implements ChannelPacketHandler {
    public handle(session: ChannelSession, packet: PacketReader): void {
        const func = packet.readByte();

        if (func === 0) {
            // This count seems to increase for each skill used
            const counter = packet.readInt();
            // objectId for climb, 13641 (0x3549 for swim dash)
            const objectId = packet.readInt();
            const clientTime = packet.readInt();
            const skillId = packet.readInt();
            packet.readShort(); // constant 1 we don't care about
            session.player.animation = packet.readInt();
            const clientTick = packet.readInt();
            packet.readLong(); // constant 0 we don't care about

            // manage gliding in air mounts
            // console.log(counter, objectId, clientTick, clientTime, skillId);
        }
    }
}
