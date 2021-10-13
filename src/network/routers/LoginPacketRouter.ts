import { RecvOp } from "../../constants/RecvOp";
import { LogSendHandler } from "../../handlers/channel/LogSendHandler";
import { CharacterManagementHandler } from "../../handlers/login/CharacterManagementHandler";
import { ResponseKeyHandler } from "../../handlers/login/ResponseKeyHandler";
import { ResponseLoginHandler } from "../../handlers/login/ResponseLoginHandler";
import { ResponseServerEnterHandler } from "../../handlers/login/ResponseServerEnterHandler";
import { ResponseVersionHandler } from "../../handlers/login/ResponseVersionHandler";
import { PacketRouter } from "./PacketRouter";

export class LoginPacketRouter extends PacketRouter {
    public registerHandlers(): void {
        this.handlers.set(RecvOp.RESPONSE_VERSION, new ResponseVersionHandler());
        this.handlers.set(RecvOp.RESPONSE_KEY, new ResponseKeyHandler());
        this.handlers.set(RecvOp.RESPONSE_LOGIN, new ResponseLoginHandler());
        this.handlers.set(RecvOp.CHARACTER_MANAGEMENT, new CharacterManagementHandler());
        this.handlers.set(RecvOp.LOG_SEND, new LogSendHandler());
        this.handlers.set(RecvOp.RESPONSE_SERVER_ENTER, new ResponseServerEnterHandler());
    }
}
