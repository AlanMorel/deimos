import { Packet } from "../crypto/protocol/Packet";
import { PacketReader } from "../crypto/protocol/PacketReader";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { CoordF } from "./coords/CoordF";
import { CoordS } from "./coords/CoordS";
import { SyncStateFlag } from "./SyncStateFlag";

export class SyncState {

    public animation1: number = 0;
    public animation2: number = 0;
    public flag: SyncStateFlag = SyncStateFlag.None;
    public coord: CoordS = new CoordS();
    public rotation: number = 0;
    public animation3: number = 0;
    public unknownFloat1: number = 0;
    public unknownFloat2: number = 0;
    public speed: CoordS = new CoordS();
    public unknown1: number = 0;
    public unknown2: number = 0;
    public unknown3: number = 0;
    public unknown4: number = 0;

    // Flag1
    public flag1Unknown1: number = 0;
    public flag1Unknown2: number = 0;

    // Flag2
    public flag2Unknown1: CoordF = new CoordF();
    public flag2Unknown2: string = "";

    // Flag3
    public flag3Unknown1: number = 0
    public flag3Unknown2: string = "";

    // Flag4
    public flag4Unknown: string = "";

    // Flag5
    public flag5Unknown1: number = 0;
    public flag5Unknown2: string = "";

    // Flag6
    public flag6Unknown1: number = 0;
    public flag6Unknown2: number = 0;
    public flag6Unknown3: number = 0;
    public flag6Unknown4: CoordF = new CoordF();
    public flag6Unknown5: CoordF = new CoordF();

    public static read(packet: PacketReader): SyncState {
        const state = new SyncState();

        state.animation1 = packet.readByte();
        state.animation2 = packet.readByte();

        state.flag = packet.readByte();
        if ((state.flag & SyncStateFlag.Flag1) != 0) {
            state.flag1Unknown1 = packet.readInt();
            state.flag1Unknown2 = packet.readShort();
        }

        state.coord = CoordS.read(packet);
        state.rotation = packet.readShort(); // CoordS / 10 (Rotation?)
        state.animation3 = packet.readByte();

        if (state.animation3 > 127) { // if animation < 0 (signed)
            state.unknownFloat1 = packet.readFloat();
            state.unknownFloat2 = packet.readFloat();
        }

        state.speed = CoordS.read(packet); // XYZ Speed?
        state.unknown1 = packet.readByte();
        state.unknown2 = packet.readShort(); // CoordS / 10
        state.unknown3 = packet.readShort(); // CoordS / 1000

        if ((state.flag & SyncStateFlag.Flag2) != 0) {
            state.flag2Unknown1 = CoordF.read(packet);
            state.flag2Unknown2 = packet.readUnicodeString();
        }

        if ((state.flag & SyncStateFlag.Flag3) != 0) {
            state.flag3Unknown1 = packet.readInt();
            state.flag3Unknown2 = packet.readUnicodeString();
        }

        if ((state.flag & SyncStateFlag.Flag4) != 0) {
            state.flag4Unknown = packet.readUnicodeString(); // animation string?
        }

        if ((state.flag & SyncStateFlag.Flag5) != 0) {
            state.flag5Unknown1 = packet.readInt();
            state.flag5Unknown2 = packet.readUnicodeString();
        }

        if ((state.flag & SyncStateFlag.Flag6) != 0) {
            state.flag6Unknown1 = packet.readInt();
            state.flag6Unknown2 = packet.readInt();
            state.flag6Unknown3 = packet.readByte();
            state.flag6Unknown4 = CoordF.read(packet);
            state.flag6Unknown5 = CoordF.read(packet);
        }

        state.unknown4 = packet.readInt();

        return state;
    }

    public static write(packet: PacketWriter, entry: SyncState): Packet {
        packet.writeByte(entry.animation1);
        packet.writeByte(entry.animation2);
        packet.writeByte(entry.flag);

        if ((entry.flag & SyncStateFlag.Flag1) != 0) {
            packet.writeInt(entry.flag1Unknown1);
            packet.writeShort(entry.flag1Unknown2);
        }

        CoordS.write(packet, entry.coord);
        packet.writeShort(entry.rotation);
        packet.writeByte(entry.animation3);

        if (entry.animation3 > 127) {
            packet.writeFloat(entry.unknownFloat1);
            packet.writeFloat(entry.unknownFloat2);
        }

        CoordS.write(packet, entry.speed);
        packet.writeByte(entry.unknown1);
        packet.writeShort(entry.unknown2);
        packet.writeShort(entry.unknown3);

        if ((entry.flag & SyncStateFlag.Flag2) != 0) {
            CoordF.write(packet, entry.flag2Unknown1);
            packet.writeUnicodeString(entry.flag2Unknown2 ?? "");
        }

        if ((entry.flag & SyncStateFlag.Flag3) != 0) {
            packet.writeInt(entry.flag3Unknown1);
            packet.writeUnicodeString(entry.flag3Unknown2 ?? "");
        }

        if ((entry.flag & SyncStateFlag.Flag4) != 0) {
            packet.writeUnicodeString(entry.flag4Unknown ?? "");
        }

        if ((entry.flag & SyncStateFlag.Flag5) != 0) {
            packet.writeInt(entry.flag5Unknown1);
            packet.writeUnicodeString(entry.flag5Unknown2 ?? "");
        }

        if ((entry.flag & SyncStateFlag.Flag6) != 0) {
            packet.writeInt(entry.flag6Unknown1);
            packet.writeInt(entry.flag6Unknown2);
            packet.writeByte(entry.flag6Unknown3);
            CoordF.write(packet, entry.flag6Unknown4);
            CoordF.write(packet, entry.flag6Unknown5);
        }

        packet.writeInt(entry.unknown4);

        return packet;
    }
}

