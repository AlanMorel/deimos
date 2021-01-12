export class Gemstone {

    public id: number;
    public ownerId: bigint = BigInt(0); // Used if bound
    public ownerName = "";
    public unknown: bigint = BigInt(0);

    public constructor(id: number) {
        this.id = id;
    }
}
