import Configs from "../../Configs";
import { PacketReader } from "../../crypto/protocol/PacketReader";
import { AuthStorage } from "../../data/storage/AuthStorage";
import { Endpoint } from "../../network/Endpoint";
import { ChannelSession } from "../../network/sessions/ChannelSession";
import { GameToLoginPacket } from "../../packets/GameToLoginPacket";
import { Logger } from "../../tools/Logger";
import { ChannelPacketHandler } from "../ChannelPacketHandler";

export class RequestQuitHandler implements ChannelPacketHandler {

    public handle(session: ChannelSession, packet: PacketReader): void {
        const mode = packet.readByte();

        if (mode == 0) {
            const authData = AuthStorage.getData(session.player.accountId);

            if (!authData) {
                Logger.log("Attempted connection to login server with unauthorized auth data.");
                return;
            }

            const endpoint = new Endpoint(Configs.login.host, Configs.login.port);

            session.send(GameToLoginPacket.gameToLogin(endpoint, authData));
        }
    }
}
