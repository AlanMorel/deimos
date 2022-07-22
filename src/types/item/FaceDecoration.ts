import { PacketReader } from "@/crypto/protocol/PacketReader";
import { Item } from "@/types/item/Item";

export class FaceDecoration extends Item {
    public data: Buffer;

    public constructor(id: number, data: Buffer) {
        super(id);

        this.data = data;
    }

    public static read(packet: PacketReader, id: number): FaceDecoration {
        const data = packet.read(16);

        return new FaceDecoration(id, data);
    }
}
