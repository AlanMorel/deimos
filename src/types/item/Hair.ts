import { PacketReader } from "../../crypto/protocol/PacketReader";
import { PacketWriter } from "../../crypto/protocol/PacketWriter";
import { Item } from "./Item";

export class Hair extends Item {
    public backLength: number;
    public frontLength: number;

    public backPositionArray: Buffer;
    public frontPositionArray: Buffer;

    public constructor(
        id: number,
        backLength: number,
        frontLength: number,
        backPositionArray: Buffer,
        frontPositionArray: Buffer
    ) {
        super(id);

        this.backLength = backLength;
        this.frontLength = frontLength;
        this.backPositionArray = backPositionArray;
        this.frontPositionArray = frontPositionArray;
    }

    public static read(packet: PacketReader, id: number): Hair {
        const backLength = packet.readInt();
        const backPositionArray = packet.read(24);
        const frontLength = packet.readInt();
        const frontPositionArray = packet.read(24);

        return new Hair(id, backLength, frontLength, backPositionArray, frontPositionArray);
    }

    public static write(packet: PacketWriter, hair: Hair): void {
        packet.writeInt(hair.backLength);
        packet.write(hair.backPositionArray);
        packet.writeInt(hair.frontLength);
        packet.write(hair.frontPositionArray);
    }
}
