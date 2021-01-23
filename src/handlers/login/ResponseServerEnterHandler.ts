import Configs from "../../Configs";
import { PacketReader } from "../../crypto/protocol/PacketReader";
import { Characters } from "../../database/controllers/Characters";
import { Endpoint } from "../../network/Endpoint";
import { LoginSession } from "../../network/sessions/LoginSession";
import { BannerListPacket } from "../../packets/BannerListPacket";
import { CharacterListPacket } from "../../packets/CharacterListPacket";
import { CharacterMaxCountPacket } from "../../packets/CharacterMaxCountPacket";
import { ServerListPacket } from "../../packets/ServerListPacket";
import { ArrayManipulator } from "../../tools/ArrayManipulator";
import { Player } from "../../types/player/Player";
import { LoginPacketHandler } from "../LoginPacketHandler";

export class ResponseServerEnterHandler implements LoginPacketHandler {

    public async handle(session: LoginSession, packet: PacketReader): Promise<void> {
        packet.readInt(); // mode: always 2?

        const endpoints = [
            new Endpoint(Configs.login.host, Configs.login.port)
        ];
        const unknownData = Buffer.from(ArrayManipulator.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]));

        session.send(BannerListPacket.setBanner(0)); // TODO: load banners
        session.send(ServerListPacket.setServers(Configs.worlds[0].name, endpoints, unknownData));

        const players = await Characters.getByAccountId(session.accountId);

        players.forEach(player => {
            player.equips = Player.getTestEquips();
        });

        session.send(CharacterMaxCountPacket.setMax(4, 6));
        session.send(CharacterListPacket.startList());
        session.send(CharacterListPacket.addEntries(players));
        session.send(CharacterListPacket.endList());
    }
}
