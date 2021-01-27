export class Account {

    public id: BigInt;
    public username: string;
    public password: string;

    public constructor(id: BigInt, username: string, password: string) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
}
