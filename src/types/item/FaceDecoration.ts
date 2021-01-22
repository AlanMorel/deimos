import { Item } from "./Item";
import { ItemSlot } from "./ItemSlot";

export class FaceDecoration extends Item {

    public data: Buffer;

    public constructor(id: number, data: Buffer) {
        super(id, ItemSlot.FD);

        this.data = data;
    }
}
