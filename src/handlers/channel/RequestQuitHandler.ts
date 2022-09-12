import Config from "@/Config";
import { PacketReader } from "@/crypto/protocol/PacketReader";
import { AuthStorage } from "@/data/storage/AuthStorage";
import { ChannelPacketHandler } from "@/handlers/ChannelPacketHandler";
import { Endpoint } from "@/network/Endpoint";
import { ChannelSession } from "@/network/sessions/ChannelSession";
import { GameToLoginPacket } from "@/packets/GameToLoginPacket";
import { Logger } from "@/tools/Logger";

export class RequestQuitHandler implements ChannelPacketHandler {
    public handle(session: ChannelSession, packet: PacketReader): void {
        const mode = packet.readByte();

        if (mode === 0) {
            const authData = AuthStorage.getData(session.player.accountId);

            if (!authData) {
                Logger.error("Attempted connection to login server with unauthorized auth data.");
                return;
            }

            const endpoint = new Endpoint(Config.login.host, Config.login.port);

            session.send(GameToLoginPacket.gameToLogin(endpoint, authData));
        }
    }
}
