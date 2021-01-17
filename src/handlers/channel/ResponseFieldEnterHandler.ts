import { PacketReader } from "../../crypto/protocol/PacketReader";
import { ChannelSession } from "../../network/sessions/ChannelSession";
import { EmotionPacket } from "../../packets/EmotionPacket";
import { FieldAddUserPacket } from "../../packets/FieldAddUserPacket";
import { KeyTablePacket } from "../../packets/KeyTablePacket";
import { ProxyGameObjectPacket } from "../../packets/ProxyGameObjectPacket";
import { StatPacket } from "../../packets/StatPacket";
import { StatPointPacket } from "../../packets/StatPointPacket";
import { ChannelPacketHandler } from "../ChannelPacketHandler";

export class ResponseFieldEnterHandler implements ChannelPacketHandler {

    public async handle(session: ChannelSession, packet: PacketReader): Promise<void> {
        packet.readInt();

        session.send(await FieldAddUserPacket.addPlayer(session.player));
        session.send(ProxyGameObjectPacket.loadPlayer(session.player));

        session.send(StatPacket.setStats(session.player));
        session.send(StatPointPacket.writeTotalStatPoints(session.player));
        session.send(EmotionPacket.loadEmotions());

        const hotbar = session.player.gameOptions.getHotbarById(0);

        if (hotbar) {
            session.send(KeyTablePacket.sendHotbars(session.player.gameOptions));
        }
    }
}
