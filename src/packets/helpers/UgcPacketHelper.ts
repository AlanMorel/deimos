import { PacketWriter } from "../../crypto/protocol/PacketWriter";

export class UgcPacketHelper {

    public static writeUgc(packet: PacketWriter): void {
        packet.writeLong();
        packet.writeUnicodeString(""); // UUID (filename)
        packet.writeUnicodeString(""); // name (itemname)
        packet.writeByte();
        packet.writeInt();
        packet.writeLong(); // accountId
        packet.writeLong(); // characterId
        packet.writeUnicodeString(""); // characterName
        packet.writeLong(); // creation time
        packet.writeUnicodeString(""); // url (no domain)
        packet.writeByte();
    }
}
