import { Session } from "../network/Session";
import { PacketReader } from "../tools/PacketReader";
import { PacketHandler } from "./PacketHandler";

export class ResponseLoginHandler implements PacketHandler {

    public handle(packet: PacketReader, session: Session): void {
        const mode = packet.readByte();
        console.log("ResponseLoginHandler Mode: " + mode);
    }
}