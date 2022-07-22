import { PacketReader } from "@/crypto/protocol/PacketReader";
import { PacketWriter } from "@/crypto/protocol/PacketWriter";
import { Coord } from "@/types/coords/Coord";

export class CoordB extends Coord {
    public static read(packet: PacketReader): CoordB {
        const x = packet.readByte();
        const y = packet.readByte();
        const z = packet.readByte();

        return new CoordB(x, y, z);
    }

    public static write(packet: PacketWriter, coords: CoordB): void {
        packet.writeByte(coords.x);
        packet.writeByte(coords.y);
        packet.writeByte(coords.z);
    }
}
