export class Gemstone {

    public id: number;
    public ownerId: BigInt = BigInt(0); // Used if bound
    public ownerName = "";
    public unknown: BigInt = BigInt(0);

    public constructor(id: number) {
        this.id = id;
    }
}
