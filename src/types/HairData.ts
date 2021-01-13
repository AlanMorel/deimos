import { PacketReader } from "../crypto/protocol/PacketReader";
import { PacketWriter } from "../crypto/protocol/PacketWriter";

export class HairData {

    public backLength: number;
    public frontLength: number;

    public backPositionArray: Buffer;
    public frontPositionArray: Buffer;

    public constructor(backLength: number, frontLength: number, backPositionArray: Buffer, frontPositionArray: Buffer) {
        this.backLength = backLength;
        this.frontLength = frontLength;
        this.backPositionArray = backPositionArray;
        this.frontPositionArray = frontPositionArray;
    }

    public static read(packet: PacketReader): HairData {
        const backLength = packet.readInt();
        const backPositionArray = packet.read(24);
        const frontLength = packet.readInt();
        const frontPositionArray = packet.read(24);

        return new HairData(backLength, frontLength, backPositionArray, frontPositionArray);
    }

    public static write(packet: PacketWriter, hairData: HairData): void {
        packet.writeInt(hairData.backLength);
        packet.write(hairData.backPositionArray);
        packet.writeInt(hairData.frontLength);
        packet.write(hairData.frontPositionArray);
    }
}
