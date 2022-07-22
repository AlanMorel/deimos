export class Gemstone {
    public id: number;
    public ownerId: bigint = 0n; // Used if bound
    public ownerName = "";
    public unknown: bigint = 0n;

    public constructor(id: number) {
        this.id = id;
    }
}
