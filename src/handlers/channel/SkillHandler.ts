import { Packet } from "../../crypto/protocol/Packet";
import { PacketReader } from "../../crypto/protocol/PacketReader";
import { ChannelSession } from "../../network/sessions/ChannelSession";
import { SkillUsePacket } from "../../packets/SkillUsePacket";
import { StatPacket } from "../../packets/StatPacket";
import { CoordF } from "../../types/coords/CoordF";
import { SkillCast } from "../../types/skills/SkillCast";
import { ChannelPacketHandler } from "../ChannelPacketHandler";

enum SkillHandlerMode {
    CAST = 0x0,
    DAMAGE = 0x1,
    SYNC = 0x2,
    SYNC_TICK = 0x3,
    CANCEL = 0x4
}
enum DamagingMode {
    SYNC_DAMAGE = 0x0,
    DAMAGE = 0x1,
    REGION_SKILL = 0x2
}

export class SkillHandler implements ChannelPacketHandler {
    public handle(session: ChannelSession, packet: PacketReader): void {
        const mode = packet.readByte() as SkillHandlerMode;

        switch (mode) {
            case SkillHandlerMode.CAST:
                this.handleCast(session, packet);
                break;
            case SkillHandlerMode.DAMAGE:
                // TODO: damage
                break;
            case SkillHandlerMode.SYNC:
                // TODO: sync
                break;
            case SkillHandlerMode.SYNC_TICK:
                // TODO: sync tick
                break;
            case SkillHandlerMode.CANCEL:
                // TODO: cancel
                break;
        }
    }

    private handleCast(session: ChannelSession, packet: PacketReader): void {
        const skillSN: BigInt = packet.readLong();
        const serverTick: number = packet.readInt();
        const skillId: number = packet.readInt();
        const skillLevel: number = packet.readShort();
        const attackPoint: number = packet.readByte();

        const position: CoordF = new CoordF(packet.readFloat(), packet.readFloat(), packet.readFloat());
        const direction: CoordF = new CoordF(packet.readFloat(), packet.readFloat(), packet.readFloat());
        const rotation: CoordF = new CoordF(packet.readFloat(), packet.readFloat(), packet.readFloat());

        packet.readFloat(); // useless float

        const clientTick: number = packet.readInt();

        packet.readBoolean();
        packet.readLong();

        const flag = packet.readBoolean();

        if (flag) {
            packet.readInt();
            packet.readUnicodeString();
        }

        const skillCast: SkillCast = new SkillCast(
            skillId,
            skillLevel,
            skillSN,
            serverTick,
            session.player.objectId,
            clientTick,
            attackPoint
        );

        if (skillCast) {
            session.field?.broadcast(SkillUsePacket.skillUse(skillCast, position, direction, rotation));
            session.send(StatPacket.setStats(session.player));
        }
    }
}
