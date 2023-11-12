import Config from "@/Config";
import { PacketReader } from "@/crypto/protocol/PacketReader";
import db from "@/database/Database";
import { LoginPacketHandler } from "@/handlers/LoginPacketHandler";
import { Endpoint } from "@/network/Endpoint";
import { LoginSession } from "@/network/sessions/LoginSession";
import { BannerListPacket } from "@/packets/BannerListPacket";
import { CharacterListPacket } from "@/packets/CharacterListPacket";
import { CharacterMaxCountPacket } from "@/packets/CharacterMaxCountPacket";
import { LoginResultPacket } from "@/packets/LoginResultPacket";
import { NpsInfoPacket } from "@/packets/NpsInfoPacket";
import { ServerListPacket } from "@/packets/ServerListPacket";
import { UgcPacket } from "@/packets/UgcPacket";
import { Logger } from "@/tools/Logger";
import { Player } from "@/types/player/Player";
import picocolors from "picocolors";

const { magenta, red, yellow } = picocolors;

enum Mode {
    LOGIN_1 = 0x1,
    LOGIN_2 = 0x2
}

export class ResponseLoginHandler implements LoginPacketHandler {
    public async handle(session: LoginSession, packet: PacketReader): Promise<void> {
        const mode = packet.readByte();
        const username = packet.readUnicodeString();
        const password = packet.readUnicodeString();

        Logger.log(`Logging in with username: '${username}' pass: '${password}'`, magenta);

        const account = await db.getAccounts().getByCredentials(username, password);

        if (account) {
            session.accountId = account.id;
        } else if (Config.settings.defaultAccountId > 0n) {
            Logger.log(
                `Account not found but logging in to default account id ${Config.settings.defaultAccountId}`,
                yellow
            );
            session.accountId = Config.settings.defaultAccountId;
        } else {
            Logger.log("Account not found and no default account id found", red);
            session.send(LoginResultPacket.incorrectID(session.accountId));
            return;
        }

        switch (mode) {
            case Mode.LOGIN_1:
                const endpoints = [new Endpoint(Config.login.host, Config.login.port)];
                const world = Config.worlds[0];

                session.send(NpsInfoPacket.npsInfo());
                session.send(BannerListPacket.setBanner(0)); // TODO: load banners
                session.send(ServerListPacket.setServers(world.name, endpoints, world.channels.length));
                break;
            case Mode.LOGIN_2:
                const players = await db.getCharacters().getByAccountId(session.accountId);

                players.forEach(player => {
                    player.equips = Player.getTestEquips();
                });

                Logger.log(`Initializing login with account id: ${session.accountId}`, magenta);

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
