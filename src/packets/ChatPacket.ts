import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { ChannelSession } from "../network/sessions/ChannelSession";
import { ChatType } from "../types/ChatType";

export class ChatPacket {

    public static send(session: ChannelSession, message: string, type: ChatType): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.USER_CHAT);
        packet.writeBigInt(session.player.accountId)
        packet.writeBigInt(session.player.characterId)
        packet.writeUnicodeString(session.player.name)
        packet.writeByte()
        packet.writeUnicodeString(message)
        packet.writeInt(type)
        packet.writeByte()
        packet.writeInt(session.channelId);

        switch (type) {
            case ChatType.WhisperFrom:
                packet.writeUnicodeString("???");
                break;
            case ChatType.Super:
                packet.writeInt(20800017); // item id?
                break;
            case ChatType.UnknownPurple:
                packet.writeLong(); // char id?
                break;
        }

        packet.writeByte();

        return packet;
    }
}

// SendUserChatItem
// 01 00 00 00 C5 1C FE 04 AD 97 CB 27 74 68 B0 00 05 00 00 00 01 00 00 00 00 00 00 00 FF FF FF FF ED 29 10 5E 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 09 00 00 00 00 00 00 00 01 A2 8C 4B 5E 00 00 00 00 01 00 00 00 00 00 00 3F 53 9E FF 16 2E 7C FF 13 1F 44 FF 0A 00 00 00 05 00 00 00 00 02 00 01 00 32 00 00 00 00 00 00 00 14 00 55 11 00 00 00 00 00 00 00 00 00 00 00 00 02 00 14 00 83 02 00 00 00 00 00 00 04 00 49 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 02 00 0C 00 80 6A 3C 3D 00 00 00 00 0D 00 00 00 00 00 00 00 80 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 0F 00 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 14 00 00 00 08 00 00 00 01 00 00 00 00 01 14 00 00 00 00 00 00 00 00 00 00 40 00 00 00 00 00 00 00 00 00 00 00 00 18 00 00 00 01 00 00 00 00 00 00 00 00 00 01 01 6C 00 3C E8 87 12 43 26 05 00 4C 00 69 00 7A 00 7A 00 75 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
// Item Enchant Msg
// 3,2867552357120351429,1,Lizzu
