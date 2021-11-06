import { PacketReader } from "../../crypto/protocol/PacketReader";
import { AuthStorage } from "../../data/storage/AuthStorage";
import { Session } from "../../network/sessions/Session";
import { MoveResultPacket } from "../../packets/MoveResultPacket";
import { Logger } from "../../tools/Logger";

export class ResponseKeyHelper {
    public static handle(session: Session, packet: PacketReader): void {
        const accountId = packet.readLong();
        const tokenA = packet.readInt();
        const tokenB = packet.readInt();

        const authData = AuthStorage.getData(accountId);

        if (!authData) {
            Logger.error("Attempted connection to channel server with unauthorized auth data.");
            return;
        }

        if (tokenA !== authData.tokenA || tokenB !== authData.tokenB) {
            Logger.error("Attempted login with invalid tokens.");
            return;
        }

        session.send(MoveResultPacket.moveResult());
    }
}
