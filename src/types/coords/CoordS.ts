import { PacketReader } from "../../crypto/protocol/PacketReader";
import { PacketWriter } from "../../crypto/protocol/PacketWriter";

export class CoordS {

    public X: number;
    public Y: number;
    public Z: number;

    public constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.X = x;
        this.Y = y;
        this.Z = z;
    }

    public toString(): string {
        return "{x: " + this.X + ", y: " + this.Y + ", z: " + this.Z + "}";
    }

    public static read(packet: PacketReader): CoordS {
        const x = packet.readShort();
        const y = packet.readShort();
        const z = packet.readShort();

        return new CoordS(x, y, z);
    }

    public static write(packet: PacketWriter, coord: CoordS): void {
        packet.writeShort(coord.X);
        packet.writeShort(coord.Y);
        packet.writeShort(coord.Z);
    }
}
