import { EntitySchema } from "typeorm";

export interface AccountRow {
    id: string;
    username: string;
    password: string;
}

export const AccountEntity = new EntitySchema<AccountRow>({
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
