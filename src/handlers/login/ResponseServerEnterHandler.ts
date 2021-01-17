import Configs from "../../Configs";
import { PacketReader } from "../../crypto/protocol/PacketReader";
import { AccountStorage } from "../../data/storage/AccountStorage";
import { CharacterStorage } from "../../data/storage/CharacterStorage";
import { Endpoint } from "../../network/Endpoint";
import { LoginSession } from "../../network/sessions/LoginSession";
import { BannerListPacket } from "../../packets/BannerListPacket";
import { CharacterListPacket } from "../../packets/CharacterListPacket";
import { CharacterMaxCountPacket } from "../../packets/CharacterMaxCountPacket";
import { ServerListPacket } from "../../packets/ServerListPacket";
import { Player } from "../../types/player/Player";
import { LoginPacketHandler } from "../LoginPacketHandler";

export class ResponseServerEnterHandler implements LoginPacketHandler {

    public handle(session: LoginSession, packet: PacketReader): void {
        const mode = packet.readInt(); // always 2?

        const endpoints = [
            new Endpoint(Configs.login.host, Configs.login.port)
        ];
        const unknownData = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9]); // TODO: scramble

        session.send(BannerListPacket.setBanner(0)); // TODO: load banners
        session.send(ServerListPacket.setServers(Configs.serverName, endpoints, unknownData));

        const accountId = BigInt(1); // TODO: temp
        const characterIds = AccountStorage.storage.getCharacterIDs(accountId);
        const players = new Array<Player>();

        characterIds.forEach(id => {
            const player = CharacterStorage.storage.getCharacter(id);

            if (player) {
                players.push(player);
            }
        });

        session.send(CharacterMaxCountPacket.setMax(4, 6));
        session.send(CharacterListPacket.startList());
        session.send(CharacterListPacket.addEntries(players));
        session.send(CharacterListPacket.endList());
    }
}
