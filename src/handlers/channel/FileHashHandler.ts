import Config from "@/Config";
import { PacketReader } from "@/crypto/protocol/PacketReader";
import { ChannelPacketHandler } from "@/handlers/ChannelPacketHandler";
import { ChannelSession } from "@/network/sessions/ChannelSession";
import { Logger } from "@/tools/Logger";

export class FileHashHandler implements ChannelPacketHandler {
    public handle(session: ChannelSession, packet: PacketReader): void {
        packet.readInt();
        const filename = packet.readMapleString();
        const md5 = packet.readMapleString();

        Logger.log(`Hash for ${filename}: ${md5}`);

        if (md5 !== Config.hash) {
            Logger.error("There has been a hash mismatch");
        }
    }
}
