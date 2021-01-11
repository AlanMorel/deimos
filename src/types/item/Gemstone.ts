export class Gemstone {
    public id: number;

    // Used if bound
    public ownerId: bigint = BigInt(0);
    public ownerName = "";

    public unknown: bigint = BigInt(0);

    public constructor(id: number) {
        this.id = id;
    }
}
