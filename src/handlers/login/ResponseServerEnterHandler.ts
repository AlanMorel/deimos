import Configs from "../../Configs";
import { PacketReader } from "../../crypto/protocol/PacketReader";
import { Database } from "../../database/Database";
import { Endpoint } from "../../network/Endpoint";
import { LoginSession } from "../../network/sessions/LoginSession";
import { BannerListPacket } from "../../packets/BannerListPacket";
import { CharacterListPacket } from "../../packets/CharacterListPacket";
import { CharacterMaxCountPacket } from "../../packets/CharacterMaxCountPacket";
import { ServerListPacket } from "../../packets/ServerListPacket";
import { Player } from "../../types/player/Player";
import { LoginPacketHandler } from "../LoginPacketHandler";

export class ResponseServerEnterHandler implements LoginPacketHandler {

    public async handle(session: LoginSession, packet: PacketReader): Promise<void> {
        packet.readInt(); // mode: always 2?

        const endpoints = [
            new Endpoint(Configs.login.host, Configs.login.port)
        ];
        const world = Configs.worlds[0];

        session.send(BannerListPacket.setBanner(0)); // TODO: load banners
        session.send(ServerListPacket.setServers(world.name, endpoints, world.channels.length));

        const players = await Database.getCharacters().getByAccountId(session.accountId);

        players.forEach(player => {
            player.equips = Player.getTestEquips();
        });

        session.send(CharacterMaxCountPacket.setMax(4, 6));
        session.send(CharacterListPacket.startList());
        session.send(CharacterListPacket.addEntries(players));
        session.send(CharacterListPacket.endList());
    }
}
