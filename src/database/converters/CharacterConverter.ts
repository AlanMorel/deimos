import { CharacterStorage } from "../../data/storage/CharacterStorage";
import { Color } from "../../types/color/Color";
import { SkinColor } from "../../types/color/SkinColor";
import { Gender } from "../../types/player/Gender";
import { Player } from "../../types/player/Player";
import { Character } from "../entities/Character";

export class CharacterConverter {

    public static fromDatabase(character: Character): Player {
        const color = Color.fromValue(character.skinColor);
        const skinColor = new SkinColor(color, color);

        const id = BigInt(character.id);
        const gender = character.gender ? Gender.Female : Gender.Male;

        const player = new Player(id, gender, character.job, character.name, skinColor);
        player.equips = CharacterStorage.getTestEquips();

        return player;
    }

    public static toDatabsae(player: Player): Character {

        const character: Character = {
            id: player.characterId.toString(),
            accountId: player.accountId.toString(),
            name: player.name,
            gender: player.gender === 1,
            job: player.jobGroupId,
            skinColor: Color.toValue(player.skinColor.primary)
        };

        return character;
    }
}
