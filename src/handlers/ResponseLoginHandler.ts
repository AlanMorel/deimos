import { PacketReader } from "../crypto/protocol/PacketReader";
import { ServerIP } from "../interfaces/ServerIP";
import { Session } from "../network/Session";
import { BannerListPacket } from "../packets/BannerListPacket";
import { CharacterListPacket } from "../packets/CharacterListPacket";
import { CharacterMaxCountPacket } from "../packets/CharacterMaxCountPacket";
import { LoginResultPacket } from "../packets/LoginResultPacket";
import { NpsInfoPacket } from "../packets/NpsInfoPacket";
import { ServerListPacket } from "../packets/ServerListPacket";
import { UgcPacket } from "../packets/UgcPacket";
import { HexColor } from "../tools/HexColor";
import { Logger } from "../tools/Logger";
import { Player } from "../types/Player";
import { PacketHandler } from "./PacketHandler";

export class ResponseLoginHandler implements PacketHandler {

    private serverName: string;
    private serverIPs: ServerIP[];

    public constructor() {
        this.serverName = "Paperwood";
        this.serverIPs = [
            {
                address: "127.0.0.1",
                port: 20001
            }
        ];
    }

    public handle(packet: PacketReader, session: Session): void {
        const mode = packet.readByte();
        const username = packet.readUnicodeString();
        const password = packet.readUnicodeString();

        Logger.log(`Logging in with username: '${username}' pass: '${password}'`, HexColor.PURPLE);

        switch (mode) {
            case 0x1:
                session.send(NpsInfoPacket.npsInfo());
                session.send(BannerListPacket.setBanner(0)); // TODO: load banners
                session.send(ServerListPacket.setServers(this.serverName, this.serverIPs));
                break;
            case 0x2:
                const accountId = 0;
                const players = new Array<Player>();

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
