import { EntitySchema } from "typeorm";

export interface Account {
    id: number;
    username: string;
    password: string;
}

export const AccountEntity = new EntitySchema<Account>({
    name: "Accounts",
    columns: {
        id: {
            primary: true,
            type: "bigint",
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
