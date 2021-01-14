import { PacketReader } from "../crypto/protocol/PacketReader";
import { ChannelSession } from "../network/sessions/ChannelSession";
import { PacketHandler } from "./PacketHandler";

export abstract class ChannelPacketHandler implements PacketHandler {

    public abstract handle(session: ChannelSession, packet: PacketReader): void;

}