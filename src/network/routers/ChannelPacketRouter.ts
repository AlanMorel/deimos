import { RecvOp } from "../../constants/RecvOp";
import { FileHashHandler } from "../../handlers/channel/FileHashHandler";
import { ResponseLoadUgcMapHandler } from "../../handlers/channel/RequestLoadUgcMapHandler";
import { ResponseFieldEnterHandler } from "../../handlers/channel/ResponseFieldEnterHandler";
import { ResponseKeyHandler } from "../../handlers/channel/ResponseKeyHandler";
import { ResponseVersionHandler } from "../../handlers/channel/ResponseVersionHandler";
import { UserChatHandler } from "../../handlers/channel/UserChatHandler";
import { PacketRouter } from "./PacketRouter";

export class ChannelPacketRouter extends PacketRouter {

    public registerHandlers(): void {
        this.handlers.set(RecvOp.RESPONSE_VERSION, new ResponseVersionHandler());
        this.handlers.set(RecvOp.RESPONSE_KEY, new ResponseKeyHandler());
        this.handlers.set(RecvOp.RESPONSE_FIELD_ENTER, new ResponseFieldEnterHandler());
        this.handlers.set(RecvOp.REQUEST_LOAD_UGC_MAP, new ResponseLoadUgcMapHandler());
        this.handlers.set(RecvOp.USER_CHAT, new UserChatHandler());
        this.handlers.set(RecvOp.FILE_HASH, new FileHashHandler());
    }
}
