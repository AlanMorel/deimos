import { Controller } from "@/database/controllers/Controller";
import prisma from "@/database/Prisma";
import { CharacterRow } from "@/database/RowTypes";
import { Color } from "@/types/color/Color";
import { SkinColor } from "@/types/color/SkinColor";
import { CoordF } from "@/types/coords/CoordF";
import { Gender } from "@/types/player/Gender";
import { Player } from "@/types/player/Player";

export class Characters extends Controller<CharacterRow, Player> {
    public async getByAccountId(id: bigint): Promise<Player[]> {
        const characters = await prisma.characters.findMany({
            where: {
                accountId: id,
                deleted: 0
            }
        });

        if (!characters) {
            return [];
        }

        return characters.map(character => this.fromDatabase(character));
    }

    public async getByCharacterId(id: bigint): Promise<Player | undefined> {
        const character = await prisma.characters.findFirst({
            where: {
                accountId: id,
                deleted: 0
            }
        });

        if (!character) {
            return;
        }

        return this.fromDatabase(character);
    }

    public async isNameFree(name: string): Promise<boolean> {
        const character = await prisma.characters.findFirst({
            where: {
                name: name
            }
        });

        return character === undefined;
    }

    public async insert(player: Player): Promise<void> {
        const character = this.toDatabase(player);
        prisma.characters.create({
            data: character
        });
    }

    public async delete(id: bigint): Promise<void> {
        const character = await prisma.characters.findFirst({
            where: {
                id: id,
                deleted: 0
            }
        });

        if (!character) {
            return;
        }

        character.deleted = 1;

        await prisma.characters.update({
            where: {
                id: id
            },
            data: character
        });
    }

    public async save(player: Player): Promise<void> {
        const character = await prisma.characters.findFirst({
            where: {
                id: player.characterId,
                deleted: 0
            }
        });

        if (!character) {
            return;
        }
        const row = this.toDatabase(player);
        const newCharacter = Object.assign(character, row);

        await prisma.characters.update({
            where: {
                id: newCharacter.id
            },
            data: newCharacter
        });
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
            id: player.characterId,
            accountId: player.accountId,
            name: player.name,
            gender: player.gender,
            job: player.job,
            skinColor: Color.toValue(player.skinColor.primary),
            mapId: player.mapId,
            x: player.coord.x,
            y: player.coord.y,
            z: player.coord.z,
            deleted: 0
        };

        return character;
    }
}
