import { Color } from "../../types/color/Color";
import { SkinColor } from "../../types/color/SkinColor";
import { Gender } from "../../types/Gender";
import { Item } from "../../types/item/Item";
import { ItemSlot } from "../../types/item/ItemSlot";
import { Player } from "../../types/Player";

export class CharacterStorage {

    public static storage: CharacterStorage = new CharacterStorage();

    public characters: Map<BigInt, Player>;

    public constructor() {
        this.characters = new Map<BigInt, Player>();

        const player = CharacterStorage.getTestPlayer();
        this.characters.set(BigInt(1), player);
    }

    public getCharacter(characterId: BigInt): Player | undefined {
        const results = this.characters.get(characterId);
        return results;
    }

    public addCharacter(character: Player): void {
        this.characters.set(character.characterId, character);
    }

    private static getTestPlayer(): Player {
        const characterId = BigInt(1);
        const gender = Gender.Male;
        const jobGroupId = 100;
        const name = "Alan";
        const skinColor = new SkinColor(new Color(-1, -22, -65, -82), new Color(-1, -22, -65, -82));
        const equips = new Map<ItemSlot, Item>();

        return new Player(characterId, gender, jobGroupId, name, skinColor, equips);
    }
}