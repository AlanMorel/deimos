import { RecvOp } from "../../constants/RecvOp";
import { CharacterManagementHandler } from "../../handlers/CharacterManagementHandler";
import { ResponseLoginHandler } from "../../handlers/ResponseLoginHandler";
import { ResponseVersionHandler } from "../../handlers/ResponseVersionHandler";
import { PacketRouter } from "./PacketRouter";

export class LoginPacketRouter extends PacketRouter {

    public init(): void {
        this.handlers.set(RecvOp.RESPONSE_VERSION, new ResponseVersionHandler());
        this.handlers.set(RecvOp.RESPONSE_LOGIN, new ResponseLoginHandler());
        this.handlers.set(RecvOp.CHARACTER_MANAGEMENT, new CharacterManagementHandler());
    }
}
