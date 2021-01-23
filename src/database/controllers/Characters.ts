import { getRepository } from "typeorm";
import { Color } from "../../types/color/Color";
import { SkinColor } from "../../types/color/SkinColor";
import { Gender } from "../../types/player/Gender";
import { Player } from "../../types/player/Player";
import { Character, CharacterEntity } from "../entities/Character";

export class Characters {

    public static async getByAccountId(id: BigInt): Promise<Player[]> {
        const repository = getRepository<Character>(CharacterEntity);
        const characters = await repository.find({
            where: {
                accountId: id.toString()
            }
        });
        return characters.map(character => this.fromDatabase(character));
    }

    public static async getByCharactertId(id: BigInt): Promise<Player | undefined> {
        const repository = getRepository<Character>(CharacterEntity);
        const character = await repository.findOne({
            where: {
                id: id.toString()
            }
        });
        if (!character) {
            return;
        }
        return this.fromDatabase(character);
    }

    public static async insert(player: Player): Promise<void> {
        const repository = getRepository<Character>(CharacterEntity);
        const character = this.toDatabase(player);
        repository.save(character);
    }

    private static fromDatabase(character: Character): Player {
        const color = Color.fromValue(character.skinColor);
        const skinColor = new SkinColor(color, color);

        const id = BigInt(character.id);
        const gender = character.gender ? Gender.Female : Gender.Male;

        const player = new Player(id, gender, character.job, character.name, skinColor);
        player.equips = Player.getTestEquips();

        return player;
    }

    private static toDatabase(player: Player): Character {

        const character: Character = {
            accountId: player.accountId.toString(),
            name: player.name,
            gender: player.gender === 1,
            job: player.jobGroupId,
            skinColor: Color.toValue(player.skinColor.primary)
        };

        return character;
    }
}
