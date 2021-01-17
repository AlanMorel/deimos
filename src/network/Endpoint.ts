export class Endpoint {

    private address: string;
    private port: number;

    public constructor(address: string, port: number) {
        this.address = address;
        this.port = port;
    }

    public getAddress(): string {
        return this.address;
    }

    public getPort(): number {
        return this.port;
    }

    public getBytes(): Buffer {
        const split = this.address.split(".");
        const bytes = split.map((byte: string) => parseInt(byte));
        return Buffer.from(bytes);
    }
}
