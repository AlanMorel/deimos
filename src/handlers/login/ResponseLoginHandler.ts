import Configs from "../../Configs";
import { PacketReader } from "../../crypto/protocol/PacketReader";
import { AccountStorage } from "../../data/storage/AccountStorage";
import { CharacterStorage } from "../../data/storage/CharacterStorage";
import { Accounts } from "../../database/controllers/Accounts";
import { Characters } from "../../database/controllers/Characters";
import { CharacterConverter } from "../../database/converters/CharacterConverter";
import { Endpoint } from "../../network/Endpoint";
import { LoginSession } from "../../network/sessions/LoginSession";
import { BannerListPacket } from "../../packets/BannerListPacket";
import { CharacterListPacket } from "../../packets/CharacterListPacket";
import { CharacterMaxCountPacket } from "../../packets/CharacterMaxCountPacket";
import { LoginResultPacket } from "../../packets/LoginResultPacket";
import { NpsInfoPacket } from "../../packets/NpsInfoPacket";
import { ServerListPacket } from "../../packets/ServerListPacket";
import { UgcPacket } from "../../packets/UgcPacket";
import { ArrayManipulator } from "../../tools/ArrayManipulator";
import { HexColor } from "../../tools/HexColor";
import { Logger } from "../../tools/Logger";
import { Player } from "../../types/player/Player";
import { LoginPacketHandler } from "../LoginPacketHandler";

enum Mode {
    LOGIN_1 = 0x1,
    LOGIN_2 = 0x2
}

export class ResponseLoginHandler implements LoginPacketHandler {

    public async handle(session: LoginSession, packet: PacketReader): Promise<void> {
        const mode = packet.readByte();
        const username = packet.readUnicodeString();
        const password = packet.readUnicodeString();

        Logger.log(`Logging in with username: '${username}' pass: '${password}'`, HexColor.PURPLE);

        const account = await Accounts.getByCredentials(username, password);

        if (account) {
            Logger.log("Account found.", HexColor.GREEN);
            session.accountId = BigInt(account.id);
        } else {
            Logger.log("Account not found.", HexColor.RED);
            session.accountId = 1n;
        }

        switch (mode) {
            case Mode.LOGIN_1:
                const endpoints = [
                    new Endpoint(Configs.login.host, Configs.login.port)
                ];
                const unknownData = Buffer.from(ArrayManipulator.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]));

                session.send(NpsInfoPacket.npsInfo());
                session.send(BannerListPacket.setBanner(0)); // TODO: load banners
                session.send(ServerListPacket.setServers(Configs.worlds[0].name, endpoints, unknownData));
                break;
            case Mode.LOGIN_2:
                const characterIds = AccountStorage.storage.getCharacterIDs(session.accountId);
                const players = new Array<Player>();

                const loading = characterIds.map(async id => {

                    const databasePlayer = await Characters.getByCharactertId(id);

                    if (!databasePlayer) {
                        return;
                    }

                    const player = CharacterConverter.fromDatabase(databasePlayer);
                    player.equips = CharacterStorage.getTestEquips();

                    players.push(player);
                });

                await Promise.all(loading);

                Logger.log("Initializing login with account id: " + session.accountId, HexColor.PURPLE);

                session.send(LoginResultPacket.login(session.accountId));
                session.send(UgcPacket.setEndpoint("http://127.0.0.1/ws.asmx?wsdl", "http://127.0.0.1"));
                session.send(CharacterMaxCountPacket.setMax(4, 6));
                session.send(CharacterListPacket.startList());
                session.send(CharacterListPacket.addEntries(players));
                session.send(CharacterListPacket.endList());
                break;
            default:
                Logger.unknownMode(this, mode);
                break;
        }
    }
}
