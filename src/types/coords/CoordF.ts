import { PacketReader } from "../../crypto/protocol/PacketReader";
import { PacketWriter } from "../../crypto/protocol/PacketWriter";

export class CoordF {

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

    public static write(packet: PacketWriter, coords: CoordF): void {
        packet.writeFloat(coords.X);
        packet.writeFloat(coords.Y);
        packet.writeFloat(coords.Z);
    }

    public static read(packet: PacketReader): CoordF {
        const x = packet.readFloat();
        const y = packet.readFloat();
        const z = packet.readFloat();

        return new CoordF(x, y, z);
    }
}
