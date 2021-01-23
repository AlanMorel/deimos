import { getRepository } from "typeorm";
import { Character, CharacterEntity } from "../entities/Character";

export class Characters {

    public static async getByAccountId(id: BigInt): Promise<Character[]> {
        const repository = getRepository<Character>(CharacterEntity);
        const characters = repository.find({
            where: {
                accountId: id.toString()
            }
        });
        return characters;
    }

    public static async getByCharactertId(id: BigInt): Promise<Character | undefined> {
        const repository = getRepository<Character>(CharacterEntity);
        const character = repository.findOne({
            where: {
                id: id.toString()
            }
        });
        return character;
    }
}
