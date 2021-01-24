import { PacketReader } from "../../crypto/protocol/PacketReader";
import { PacketWriter } from "../../crypto/protocol/PacketWriter";
import { Coord } from "./Coord";

export class CoordB extends Coord {

    public static read(packet: PacketReader): CoordB {
        const x = packet.readByte();
        const y = packet.readByte();
        const z = packet.readByte();

        return new CoordB(x, y, z);
    }

    public static write(packet: PacketWriter, coords: CoordB): void {
        packet.writeByte(coords.X);
        packet.writeByte(coords.Y);
        packet.writeByte(coords.Z);
    }
}
