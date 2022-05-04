import { PacketReader } from "../../crypto/protocol/PacketReader";
import { ChannelSession } from "../../network/sessions/ChannelSession";
import { ChannelPacketHandler } from "../ChannelPacketHandler";

export class StateHandler implements ChannelPacketHandler {
    public handle(session: ChannelSession, packet: PacketReader): void {
        const mode = packet.readByte();

        switch (mode) {
            case 0x0:
            // TODO: Handle jump
            case 0x1:
                // Handle land
                break;
        }
    }
}
