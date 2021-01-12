import { PacketWriter } from "../../crypto/protocol/PacketWriter";

export class CoordF {

    public X: number;
    public Y: number;
    public Z: number;

    public constructor(x: number, y: number, z: number) {
        this.X = x;
        this.Y = y;
        this.Z = z;
    }

    public static write(packet: PacketWriter, coords: CoordF): void {
        packet.writeInt(coords.X);
        packet.writeInt(coords.Y);
        packet.writeInt(coords.Z);
    }
}
