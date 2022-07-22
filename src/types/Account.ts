export class Account {
    public id: bigint;
    public username: string;
    public password: string;

    public constructor(id: bigint, username: string, password: string) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
}
