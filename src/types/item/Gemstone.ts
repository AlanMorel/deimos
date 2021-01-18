export class Gemstone {

    public id: number;
    public ownerId: BigInt = 0n; // Used if bound
    public ownerName = "";
    public unknown: BigInt = 0n;

    public constructor(id: number) {
        this.id = id;
    }
}
