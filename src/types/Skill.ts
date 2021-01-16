export class Skill {

    public id: number;
    public level: number;
    public learned: number;
    public feature: string;
    public sub: Array<number>;

    public constructor(id: number, level: number, learned: number, feature: string = "", sub: Array<number> = []) {
        this.id = id;
        this.level = level;
        this.learned = learned;
        this.feature = feature;
        this.sub = sub;
    }
}
