import { RecvOp } from "../../constants/RecvOp";
import { ResponseVersionHandler } from "../../handlers/channel/ResponseVersionHandler";
import { PacketRouter } from "./PacketRouter";

export class ChannelPacketRouter extends PacketRouter {

    public registerHandlers(): void {
        this.handlers.set(RecvOp.RESPONSE_VERSION, new ResponseVersionHandler());
    }
}
