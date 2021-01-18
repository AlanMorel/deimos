import { Color } from "../../types/color/Color";
import { ItemColor } from "../../types/color/ItemColor";
import { SkinColor } from "../../types/color/SkinColor";
import { HairData } from "../../types/item/HairData";
import { Item } from "../../types/item/Item";
import { ItemSlot } from "../../types/item/ItemSlot";
import { Gender } from "../../types/player/Gender";
import { Player } from "../../types/player/Player";

export class CharacterStorage {

    public static storage: CharacterStorage = new CharacterStorage();

    public characters: Map<BigInt, Player> = new Map<BigInt, Player>();

    public constructor() {
        const testCharacter1 = CharacterStorage.getTestCharacter1();
        const testCharacter2 = CharacterStorage.getTestCharacter2();

        this.addCharacter(testCharacter1);
        this.addCharacter(testCharacter2);
    }

    public getCharacter(characterId: BigInt): Player | undefined {
        return this.characters.get(characterId);
    }

    public addCharacter(character: Player): void {
        this.characters.set(character.characterId, character);
    }

    private static getTestCharacter1(): Player {
        const characterId = BigInt(1);
        const gender = Gender.Male;
        const jobGroupId = 30;
        const name = "Alan";
        const skinColor = new SkinColor(new Color(-82, -65, -22, -1), new Color(-82, -65, -22, -1));
        const equips = new Map<ItemSlot, Item>();

        const ears = new Item(10500001, ItemSlot.ER);

        const hair = new Item(10200001, ItemSlot.HR);
        hair.hairData = new HairData(1065353216, 1065353216, Buffer.alloc(24), Buffer.alloc(24));
        hair.color = new ItemColor(new Color(47, 47, -86, -1), new Color(-37, -123, 76, -1), new Color(19, 19, 96, -1), 0);

        const face = new Item(10300014, ItemSlot.FA);
        face.color = new ItemColor(new Color(41, 36, -75, -1), new Color(-29, -29, -9, -1), new Color(2, 7, 20, -1), 0);

        const faceDecoration = new Item(10400002, ItemSlot.FD);
        faceDecoration.faceDecorationData = Buffer.alloc(16);

        const top = new Item(11400631, ItemSlot.CL);
        top.color = new ItemColor(new Color(41, 36, -75, -1), new Color(-29, -29, -9, -1), new Color(2, 7, 20, -1), 0);

        const bottom = new Item(11500538, ItemSlot.PA);
        bottom.color = new ItemColor(new Color(0, 0, 0, -1), new Color(0, 0, 0, -1), new Color(0, 0, 0, -1), 0);

        const shoes = new Item(11700709, ItemSlot.SH);
        shoes.color = new ItemColor(new Color(51, 59, 63, -1), new Color(27, 32, 35, -1), new Color(15, 18, 20, -1), 0);

        equips.set(ItemSlot.ER, ears);
        equips.set(ItemSlot.HR, hair);
        equips.set(ItemSlot.FA, face);
        equips.set(ItemSlot.FD, faceDecoration);
        equips.set(ItemSlot.CL, top);
        equips.set(ItemSlot.PA, bottom);
        equips.set(ItemSlot.SH, shoes);

        return new Player(characterId, gender, jobGroupId, name, skinColor, equips);
    }

    private static getTestCharacter2(): Player {
        const characterId = BigInt(2);
        const gender = Gender.Male;
        const jobGroupId = 30;
        const name = "Thunderbro";
        const skinColor = new SkinColor(new Color(-82, -65, -22, -1), new Color(-82, -65, -22, -1));
        const equips = new Map<ItemSlot, Item>();

        const ears = new Item(10500001, ItemSlot.ER);

        const hair = new Item(10200001, ItemSlot.HR);
        hair.hairData = new HairData(1065353216, 1065353216, Buffer.alloc(24), Buffer.alloc(24));
        hair.color = new ItemColor(new Color(88, -67, -12, -1), new Color(-37, -123, 76, -1), new Color(19, 19, 96, -1), 0);

        const face = new Item(10300014, ItemSlot.FA);
        face.color = new ItemColor(new Color(88, -67, -12, -1), new Color(-29, -29, -9, -1), new Color(2, 7, 20, -1), 0);

        const faceDecoration = new Item(10400002, ItemSlot.FD);
        faceDecoration.faceDecorationData = Buffer.alloc(16);

        const top = new Item(11400631, ItemSlot.CL);
        top.color = new ItemColor(new Color(88, -67, -12, -1), new Color(-29, -29, -9, -1), new Color(2, 7, 20, -1), 0);

        const bottom = new Item(11500538, ItemSlot.PA);
        bottom.color = new ItemColor(new Color(0, 0, 0, -1), new Color(0, 0, 0, -1), new Color(0, 0, 0, -1), 0);

        const shoes = new Item(11700709, ItemSlot.SH);
        shoes.color = new ItemColor(new Color(88, -67, -12, -1), new Color(27, 32, 35, -1), new Color(15, 18, 20, -1), 0);

        equips.set(ItemSlot.ER, ears);
        equips.set(ItemSlot.HR, hair);
        equips.set(ItemSlot.FA, face);
        equips.set(ItemSlot.FD, faceDecoration);
        equips.set(ItemSlot.CL, top);
        equips.set(ItemSlot.PA, bottom);
        equips.set(ItemSlot.SH, shoes);

        return new Player(characterId, gender, jobGroupId, name, skinColor, equips);
    }
}
