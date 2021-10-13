import { PacketReader } from "../../crypto/protocol/PacketReader";
import { Session } from "../../network/sessions/Session";
import { ChannelPacketHandler } from "../ChannelPacketHandler";
import { LogSendHelper } from "../helpers/LogSendHelper";

export class LogSendHandler implements ChannelPacketHandler {
    public handle(session: Session, packet: PacketReader): void {
        LogSendHelper.handle(session, packet);
    }
}
