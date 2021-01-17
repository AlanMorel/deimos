import { PacketReader } from "../../crypto/protocol/PacketReader";
import { ChannelSession } from "../../network/sessions/ChannelSession";
import { EmotionPacket } from "../../packets/EmotionPacket";
import { KeyTablePacket } from "../../packets/KeyTablePacket";
import { StatPacket } from "../../packets/StatPacket";
import { StatPointPacket } from "../../packets/StatPointPacket";
import { ChannelPacketHandler } from "../ChannelPacketHandler";

export class ResponseFieldEnterHandler implements ChannelPacketHandler {

    public async handle(session: ChannelSession, packet: PacketReader): Promise<void> {
        packet.readInt();

        if (session.field) {
            await session.field.addPlayer(session);
        }

        session.send(StatPacket.setStats(session.player));
        session.send(StatPointPacket.writeTotalStatPoints(session.player));
        session.send(EmotionPacket.loadEmotions());

        const hotbar = session.player.gameOptions.getHotbarById(0);

        if (hotbar) {
            session.send(KeyTablePacket.sendHotbars(session.player.gameOptions));
        }
    }
}
