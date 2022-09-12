import Config from "@/Config";
import { PacketReader } from "@/crypto/protocol/PacketReader";
import { AuthStorage } from "@/data/storage/AuthStorage";
import { ChannelPacketHandler } from "@/handlers/ChannelPacketHandler";
import { Endpoint } from "@/network/Endpoint";
import { ChannelSession } from "@/network/sessions/ChannelSession";
import { GameToGamePacket } from "@/packets/GameToGamePacket";
import { Logger } from "@/tools/Logger";

export class ChannelHandler implements ChannelPacketHandler {
    public handle(session: ChannelSession, packet: PacketReader): void {
        const authData = AuthStorage.getData(session.player.accountId);

        if (!authData) {
            Logger.error("Attempted connection to login server with unauthorized auth data.");
            return;
        }

        const channelId = packet.readShort();

        const channel = Config.worlds[0].channels[channelId - 1];

        const endpoint = new Endpoint(channel.host, channel.port);

        session.send(GameToGamePacket.gameToGame(session.player.mapId, endpoint, authData));
    }
}
