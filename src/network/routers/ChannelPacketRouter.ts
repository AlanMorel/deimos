import { RecvOp } from "../../constants/RecvOp";
import { ResponseLoadUgcMapHandler } from "../../handlers/channel/RequestLoadUgcMapHandler";
import { ResponseKeyHandler } from "../../handlers/channel/ResponseKeyHandler";
import { ResponseVersionHandler } from "../../handlers/channel/ResponseVersionHandler";
import { PacketRouter } from "./PacketRouter";

export class ChannelPacketRouter extends PacketRouter {

    public registerHandlers(): void {
        this.handlers.set(RecvOp.RESPONSE_VERSION, new ResponseVersionHandler());
        this.handlers.set(RecvOp.RESPONSE_KEY, new ResponseKeyHandler());
        this.handlers.set(RecvOp.REQUEST_LOAD_UGC_MAP, new ResponseLoadUgcMapHandler());
    }
}
