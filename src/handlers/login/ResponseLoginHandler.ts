import Configs from "../../configs.json";
import { PacketReader } from "../../crypto/protocol/PacketReader";
import { AccountStorage } from "../../data/storage/AccountStorage";
import { CharacterStorage } from "../../data/storage/CharacterStorage";
import { Endpoint } from "../../network/Endpoint";
import { LoginSession } from "../../network/sessions/LoginSession";
import { BannerListPacket } from "../../packets/BannerListPacket";
import { CharacterListPacket } from "../../packets/CharacterListPacket";
import { CharacterMaxCountPacket } from "../../packets/CharacterMaxCountPacket";
import { LoginResultPacket } from "../../packets/LoginResultPacket";
import { NpsInfoPacket } from "../../packets/NpsInfoPacket";
import { ServerListPacket } from "../../packets/ServerListPacket";
import { UgcPacket } from "../../packets/UgcPacket";
import { HexColor } from "../../tools/HexColor";
import { Logger } from "../../tools/Logger";
import { Player } from "../../types/Player";
import { LoginPacketHandler } from "../LoginPacketHandler";

enum Mode {
    LOGIN_1 = 0x1,
    LOGIN_2 = 0x2
}

export class ResponseLoginHandler implements LoginPacketHandler {

    public handle(session: LoginSession, packet: PacketReader): void {
        const mode = packet.readByte();
        const username = packet.readUnicodeString();
        const password = packet.readUnicodeString();

        Logger.log(`Logging in with username: '${username}' pass: '${password}'`, HexColor.PURPLE);

        session.accountId = BigInt(1); // TODO: temporary

        switch (mode) {
            case Mode.LOGIN_1:
                const endpoints = [
                    new Endpoint(Configs.login.host, Configs.login.port)
                ];
                const unknownData = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9]); // TODO: scramble

                session.send(NpsInfoPacket.npsInfo());
                session.send(BannerListPacket.setBanner(0)); // TODO: load banners
                session.send(ServerListPacket.setServers(Configs.serverName, endpoints, unknownData));
                break;
            case Mode.LOGIN_2:
                const accountId = BigInt(1);
                const characterIds = AccountStorage.storage.getCharacterIDs(accountId);
                const players = new Array<Player>();

                characterIds.forEach(id => {
                    const player = CharacterStorage.storage.getCharacter(id);

                    if (player) {
                        players.push(player);
                    }
                });

                Logger.log("Initializing login with account id: " + accountId, HexColor.PURPLE);

                session.send(LoginResultPacket.login(accountId));
                session.send(UgcPacket.setEndpoint("http://127.0.0.1/ws.asmx?wsdl", "http://127.0.0.1"));
                session.send(CharacterMaxCountPacket.setMax(4, 6));
                session.send(CharacterListPacket.startList());
                session.send(CharacterListPacket.addEntries(players));
                session.send(CharacterListPacket.endList());
                break;
        }
    }
}
