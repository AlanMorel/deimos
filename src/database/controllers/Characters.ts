import { Color } from "../../types/color/Color";
import { SkinColor } from "../../types/color/SkinColor";
import { CoordF } from "../../types/coords/CoordF";
import { Gender } from "../../types/player/Gender";
import { Player } from "../../types/player/Player";
import { CharacterEntity, CharacterRow } from "../entities/Character";
import { Controller } from "./Controller";

export class Characters extends Controller<CharacterRow, Player> {

    public constructor() {
        super(CharacterEntity);
    }

    public async getByAccountId(id: BigInt): Promise<Player[]> {
        const characters = await this.repository.find({
            where: {
                accountId: id.toString(),
                deleted: false
            }
        });
        return characters.map(character => this.fromDatabase(character));
    }

    public async getByCharacterId(id: BigInt): Promise<Player | undefined> {
        const character = await this.repository.findOne({
            where: {
                id: id.toString(),
                deleted: false
            }
        });
        if (!character) {
            return;
        }
        return this.fromDatabase(character);
    }

    public async isNameFree(name: string): Promise<boolean> {
        const character = await this.repository.findOne({
            where: {
                name: name
            }
        });
        return character === undefined;
    }

    public async insert(player: Player): Promise<void> {
        const character = this.toDatabase(player);
        this.repository.save(character);
    }

    public async delete(id: BigInt): Promise<boolean> {
        const character = await this.repository.findOne({
            where: {
                id: id.toString(),
                deleted: false
            }
        });

        if (!character) {
            return false;
        }

        character.deleted = true;

        this.repository.save(character);

        return true;
    }

    protected fromDatabase(character: CharacterRow): Player {
        const color = Color.fromValue(character.skinColor);
        const skinColor = new SkinColor(color, color);

        const id = BigInt(character.id);
        const gender = character.gender ? Gender.Female : Gender.Male;

        const player = new Player(id, gender, character.job, character.name, skinColor);
        player.equips = Player.getTestEquips();
        player.mapId = character.mapId;
        player.coord = new CoordF(character.x, character.y, character.z);

        return player;
    }

    protected toDatabase(player: Player): CharacterRow {

        const character: CharacterRow = {
            accountId: player.accountId.toString(),
            name: player.name,
            gender: player.gender === 1,
            job: player.job,
            skinColor: Color.toValue(player.skinColor.primary),
            mapId: player.mapId,
            x: player.coord.x,
            y: player.coord.y,
            z: player.coord.z,
            deleted: false
        };

        return character;
    }
}
