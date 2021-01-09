import { Session } from "../network/Session";
import { PacketReader } from "../tools/PacketReader";
import { PacketHandler } from "./PacketHandler";

export class ResponseVersionHandler implements PacketHandler {

    public handle(packet: PacketReader, session: Session): void {
        console.log("ResponseVersionHandler called");
    }
}