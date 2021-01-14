import { RecvOp } from "../../constants/RecvOp";
import { ResponseKeyHandler } from "../../handlers/channel/ResponseKeyHandler";
import { ResponseVersionHandler } from "../../handlers/channel/ResponseVersionHandler";
import { PacketRouter } from "./PacketRouter";

export class ChannelPacketRouter extends PacketRouter {

    public registerHandlers(): void {
        this.handlers.set(RecvOp.RESPONSE_VERSION, new ResponseVersionHandler());
        this.handlers.set(RecvOp.RESPONSE_KEY, new ResponseKeyHandler());
    }
}
