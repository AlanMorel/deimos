import { PacketReader } from "../../crypto/protocol/PacketReader";
import { ChannelSession } from "../../network/sessions/ChannelSession";
import { ChatPacket } from "../../packets/ChatPacket";
import { ChatType } from "../../types/ChatType";
import { Commands } from "../../types/Commands";
import { ChannelPacketHandler } from "../ChannelPacketHandler";

export class UserChatHandler implements ChannelPacketHandler {

    public handle(session: ChannelSession, packet: PacketReader): void {
        const type = packet.readInt();
        const message = packet.readUnicodeString();
        const recipient = packet.readUnicodeString();
        packet.readLong();

        Commands.process(session, message);

        switch (type) {
            case ChatType.Channel:
                // TODO: Send to all players on current channel
                break;
            case ChatType.Super:
            case ChatType.World:
                // TODO: Send to all players online
                break;
            case ChatType.GuildNotice:
            case ChatType.Guild:
                // TODO: Send to all in guild
                break;
            case ChatType.Party:
                // TODO: Send to all in party
                break;
            case ChatType.WhisperTo:
                // TODO: Send to recipient
                break;
            default:
                session.send(ChatPacket.send(session, message, type)); // TODO: broadcast to entire map
                break;
        }
    }
}
