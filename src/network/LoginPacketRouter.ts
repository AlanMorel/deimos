import { RecvOp } from "../constants/RecvOp";
import { ResponseVersionHandler } from "../handlers/ResponseVersionHandler";
import { PacketRouter } from "./PacketRouter";

export class LoginPacketRouter extends PacketRouter {

    public init(): void {
        this.handlers.set(RecvOp.RESPONSE_VERSION, new ResponseVersionHandler());
    }
}
