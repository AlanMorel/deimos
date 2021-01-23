import { Color } from "../../types/color/Color";
import { ItemColor } from "../../types/color/ItemColor";
import { FaceDecoration } from "../../types/item/FaceDecoration";
import { Hair } from "../../types/item/Hair";
import { Item } from "../../types/item/Item";
import { ItemSlot } from "../../types/item/ItemSlot";

export class CharacterStorage {

    public static readonly storage: CharacterStorage = new CharacterStorage();

    public static getTestEquips(): Map<ItemSlot, Item> {
        const equips = new Map<ItemSlot, Item>();

        const ears = new Item(10500001);

        const hair = new Hair(10200001, 1065353216, 1065353216, Buffer.alloc(24), Buffer.alloc(24));
        hair.color = new ItemColor(new Color(47, 47, -86, -1), new Color(-37, -123, 76, -1), new Color(19, 19, 96, -1), 0);

        const face = new Item(10300014);
        face.color = new ItemColor(new Color(41, 36, -75, -1), new Color(-29, -29, -9, -1), new Color(2, 7, 20, -1), 0);

        const faceDecoration = new FaceDecoration(10400002, Buffer.alloc(16));

        const top = new Item(11400631);
        top.color = new ItemColor(new Color(41, 36, -75, -1), new Color(-29, -29, -9, -1), new Color(2, 7, 20, -1), 0);

        const bottom = new Item(11500538);
        bottom.color = new ItemColor(new Color(0, 0, 0, -1), new Color(0, 0, 0, -1), new Color(0, 0, 0, -1), 0);

        const shoes = new Item(11700709);
        shoes.color = new ItemColor(new Color(51, 59, 63, -1), new Color(27, 32, 35, -1), new Color(15, 18, 20, -1), 0);

        equips.set(ItemSlot.ER, ears);
        equips.set(ItemSlot.HR, hair);
        equips.set(ItemSlot.FA, face);
        equips.set(ItemSlot.FD, faceDecoration);
        equips.set(ItemSlot.CL, top);
        equips.set(ItemSlot.PA, bottom);
        equips.set(ItemSlot.SH, shoes);

        return equips;
    }
}
