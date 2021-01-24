import { Color } from "../../types/color/Color";
import { SkinColor } from "../../types/color/SkinColor";
import { Gender } from "../../types/player/Gender";
import { Player } from "../../types/player/Player";
import { Character, CharacterEntity } from "../entities/Character";
import { Controller } from "./Controller";

export class Characters extends Controller<Character, Player> {

    public constructor() {
        super(CharacterEntity);
    }

    public async getByAccountId(id: BigInt): Promise<Player[]> {
        const characters = await this.repository.find({
            where: {
                accountId: id.toString()
            }
        });
        return characters.map(character => this.fromDatabase(character));
    }

    public async getByCharacterId(id: BigInt): Promise<Player | undefined> {
        const character = await this.repository.findOne({
            where: {
                id: id.toString()
            }
        });
        if (!character) {
            return;
        }
        return this.fromDatabase(character);
    }

    public async insert(player: Player): Promise<void> {
        const character = this.toDatabase(player);
        this.repository.save(character);
    }

    protected fromDatabase(character: Character): Player {
        const color = Color.fromValue(character.skinColor);
        const skinColor = new SkinColor(color, color);

        const id = BigInt(character.id);
        const gender = character.gender ? Gender.Female : Gender.Male;

        const player = new Player(id, gender, character.job, character.name, skinColor);
        player.equips = Player.getTestEquips();

        return player;
    }

    protected toDatabase(player: Player): Character {

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
