import Config from "@/Config";
import { PacketReader } from "@/crypto/protocol/PacketReader";
import db from "@/database/Database";
import { LoginPacketHandler } from "@/handlers/LoginPacketHandler";
import { Endpoint } from "@/network/Endpoint";
import { LoginSession } from "@/network/sessions/LoginSession";
import { BannerListPacket } from "@/packets/BannerListPacket";
import { CharacterListPacket } from "@/packets/CharacterListPacket";
import { CharacterMaxCountPacket } from "@/packets/CharacterMaxCountPacket";
import { ServerListPacket } from "@/packets/ServerListPacket";
import { Player } from "@/types/player/Player";

export class ResponseServerEnterHandler implements LoginPacketHandler {
    public async handle(session: LoginSession, packet: PacketReader): Promise<void> {
        packet.readInt(); // mode: always 2?

        const endpoints = [new Endpoint(Config.login.host, Config.login.port)];
        const world = Config.worlds[0];

        session.send(BannerListPacket.setBanner(0)); // TODO: load banners
        session.send(ServerListPacket.setServers(world.name, endpoints, world.channels.length));

        const players = await db.getCharacters().getByAccountId(session.accountId);

        players.forEach(player => {
            player.equips = Player.getTestEquips();
        });

        session.send(CharacterMaxCountPacket.setMax(4, 6));
        session.send(CharacterListPacket.startList());
        session.send(CharacterListPacket.addEntries(players));
        session.send(CharacterListPacket.endList());
    }
}
