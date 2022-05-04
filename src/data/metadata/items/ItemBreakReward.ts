export class ItemBreakReward {
    public id: number;
    public count: number;

    public constructor(id: number, count: number) {
        this.id = id;
        this.count = count;
    }

    public toString(): string {
        return `id: ${this.id}, amount: ${this.count}`;
    }
}
