import { EntitySchema } from "typeorm";

export interface Account {
    id: number;
    username: string;
    password: string;
}

export const AccountEntity = new EntitySchema<Account>({
    name: "Account",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        username: {
            type: "tinytext"
        },
        password: {
            type: "tinytext"
        }
    }
});
