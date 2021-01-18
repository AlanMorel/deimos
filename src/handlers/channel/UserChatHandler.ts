import { PacketReader } from "../../crypto/protocol/PacketReader";
import { ChannelSession } from "../../network/sessions/ChannelSession";
import { ChatPacket } from "../../packets/ChatPacket";
import { World } from "../../server/World";
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
                const recipientPlayer = World.getInstance().getPlayerByName(recipient);

                if (!recipientPlayer || !recipientPlayer.session) {
                    session.send(ChatPacket.send(session, "Player not found or they are not online.", ChatType.WhisperFail));
                    break;
                }

                recipientPlayer.session.send(ChatPacket.send(session, message, ChatType.WhisperFrom));
                session.send(ChatPacket.send(recipientPlayer.session, message, ChatType.WhisperTo));
                break;
            default:
                session.field?.broadcast(ChatPacket.send(session, message, type));
                break;
        }
    }
}
