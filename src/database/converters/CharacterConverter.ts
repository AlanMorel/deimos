import { CharacterStorage } from "../../data/storage/CharacterStorage";
import { BitConverter } from "../../tools/BitConverter";
import { Color } from "../../types/color/Color";
import { SkinColor } from "../../types/color/SkinColor";
import { Gender } from "../../types/player/Gender";
import { Player } from "../../types/player/Player";
import { Character } from "../entities/Character";

export class CharacterConverter {

    public static fromDatabase(character: Character): Player {
        const colors = BitConverter.intToBytes(character.skinColor);
        const colorsBuffer = Buffer.from([colors[0], colors[1], colors[2], colors[3]]);

        const color1 = colorsBuffer.readInt8(0);
        const color2 = colorsBuffer.readInt8(1);
        const color3 = colorsBuffer.readInt8(2);
        const color4 = colorsBuffer.readInt8(3);

        const color = new Color(color1, color2, color3, color4);
        const skinColor = new SkinColor(color, color);

        const id = BigInt(character.id);
        const gender = character.gender ? Gender.Female : Gender.Male;

        const player = new Player(id, gender, character.job, character.name, skinColor);
        player.equips = CharacterStorage.getTestEquips();

        return player;
    }
}
