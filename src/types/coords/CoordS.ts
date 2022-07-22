import { PacketReader } from "@/crypto/protocol/PacketReader";
import { PacketWriter } from "@/crypto/protocol/PacketWriter";
import { Coord } from "@/types/coords/Coord";

export class CoordS extends Coord {
    public static read(packet: PacketReader): CoordS {
        const x = packet.readShort();
        const y = packet.readShort();
        const z = packet.readShort();

        return new CoordS(x, y, z);
    }

    public static write(packet: PacketWriter, coord: CoordS): void {
        packet.writeShort(coord.x);
        packet.writeShort(coord.y);
        packet.writeShort(coord.z);
    }
}
