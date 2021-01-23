import { EntitySchema } from "typeorm";

export interface Character {
    id?: string;
    accountId: string,
    name: string;
    gender: boolean;
    job: number;
    skinColor: number;
}

export const CharacterEntity = new EntitySchema<Character>({
    name: "Characters",
    columns: {
        id: {
            primary: true,
            type: "bigint",
            generated: true
        },
        accountId: {
            type: "bigint",
        },
        name: {
            type: "tinytext"
        },
        gender: {
            type: "boolean"
        },
        job: {
            type: "int"
        },
        skinColor: {
            type: "int"
        }
    }
});
