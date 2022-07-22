import { PacketReader } from "@/crypto/protocol/PacketReader";
import { ChannelPacketHandler } from "@/handlers/ChannelPacketHandler";
import { LogSendHelper } from "@/handlers/helpers/LogSendHelper";
import { Session } from "@/network/sessions/Session";

export class LogSendHandler implements ChannelPacketHandler {
    public handle(session: Session, packet: PacketReader): void {
        LogSendHelper.handle(session, packet);
    }
}
