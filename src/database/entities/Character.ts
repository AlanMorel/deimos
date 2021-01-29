import { EntitySchema } from "typeorm";

export interface CharacterRow {
    id?: string;
    accountId: string,
    name: string;
    gender: boolean;
    job: number;
    skinColor: number;
    mapId: number;
    x: number;
    y: number;
    z: number;
    deleted: boolean;
}

export const CharacterEntity = new EntitySchema<CharacterRow>({
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
        },
        mapId: {
            type: "int"
        },
        x: {
            type: "int"
        },
        y: {
            type: "int"
        },
        z: {
            type: "int"
        },
        deleted: {
            type: "boolean"
        }
    }
});
