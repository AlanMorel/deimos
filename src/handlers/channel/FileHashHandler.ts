import Configs from "../../Configs";
import { PacketReader } from "../../crypto/protocol/PacketReader";
import { ChannelSession } from "../../network/sessions/ChannelSession";
import { Logger } from "../../tools/Logger";
import { ChannelPacketHandler } from "../ChannelPacketHandler";

export class FileHashHandler implements ChannelPacketHandler {

    public handle(session: ChannelSession, packet: PacketReader): void {
        packet.readInt();
        const filename = packet.readMapleString();
        const md5 = packet.readMapleString();

        Logger.log(`Hash for ${filename}: ${md5}`);

        if (md5 !== Configs.hash) {
            Logger.error("There has been a hash mismatch");
        }
    }
}
