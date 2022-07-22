import { PacketReader } from "@/crypto/protocol/PacketReader";
import { PacketHandler } from "@/handlers/PacketHandler";
import { ChannelSession } from "@/network/sessions/ChannelSession";

export abstract class ChannelPacketHandler implements PacketHandler {
    public abstract handle(session: ChannelSession, packet: PacketReader): void;
}
