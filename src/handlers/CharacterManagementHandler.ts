import { PacketReader } from "../crypto/protocol/PacketReader";
import { Endpoint } from "../interfaces/Endpoint";
import { Session } from "../network/Session";
import { LoginToGamePacket } from "../packets/LoginToGamePacket";
import { HexColor } from "../tools/HexColor";
import { Logger } from "../tools/Logger";
import { PacketHandler } from "./PacketHandler";

export class CharacterManagementHandler implements PacketHandler {

    public handle(session: Session, packet: PacketReader): void {
        const mode = packet.readByte();

        switch (mode) {
            case 0x0: // login
                this.handleLogin(session, packet);
                break;
            case 0x1: // create
            case 0x2: // delete
                break;
        }
    }

    private handleLogin(session: Session, packet: PacketReader): void {
        const charId = packet.readLong();
        packet.readShort(); // 01 00

        Logger.log(`Logging in to game with char id: ${charId}`, HexColor.PURPLE);

        const endpoint = new Endpoint("127.0.0.1", 20001);

        const authData = {
            tokenA: Math.random(),
            tokenB: Math.random(),
            characterId: charId,
        };

        session.send(LoginToGamePacket.loginToGame(endpoint, authData));
        // TODO: end session
    }
}
