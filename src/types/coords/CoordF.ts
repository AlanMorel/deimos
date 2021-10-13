import { PacketReader } from "../../crypto/protocol/PacketReader";
import { PacketWriter } from "../../crypto/protocol/PacketWriter";
import { Coord } from "./Coord";

export class CoordF extends Coord {
    public static read(packet: PacketReader): CoordF {
        const x = packet.readFloat();
        const y = packet.readFloat();
        const z = packet.readFloat();

        return new CoordF(x, y, z);
    }

    public static write(packet: PacketWriter, coords: CoordF): void {
        packet.writeFloat(coords.x);
        packet.writeFloat(coords.y);
        packet.writeFloat(coords.z);
    }
}
