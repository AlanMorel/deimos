import { Color } from "../../types/color/Color";
import { ItemColor } from "../../types/color/ItemColor";
import { SkinColor } from "../../types/color/SkinColor";
import { Gender } from "../../types/Gender";
import { HairData } from "../../types/HairData";
import { Item } from "../../types/item/Item";
import { ItemSlot } from "../../types/item/ItemSlot";
import { Player } from "../../types/Player";

export class CharacterStorage {

    public static storage: CharacterStorage = new CharacterStorage();

    public characters: Map<BigInt, Player> = new Map<BigInt, Player>();

    public constructor() {
        const testCharacterId = BigInt(1);
        const testCharacter = CharacterStorage.getTestCharacter(testCharacterId);
        this.characters.set(testCharacterId, testCharacter);
    }

    public getCharacter(characterId: BigInt): Player | undefined {
        const results = this.characters.get(characterId);
        return results;
    }

    public addCharacter(character: Player): void {
        this.characters.set(character.characterId, character);
    }

    private static getTestCharacter(characterId: BigInt): Player {
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
}
