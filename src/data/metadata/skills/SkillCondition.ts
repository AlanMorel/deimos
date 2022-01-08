export class SkillCondition {
    public readonly id: number;
    public readonly level: number;
    public readonly splash: boolean;
    public readonly target: number;
    public readonly owner: number;

    public constructor(id: number, level: number, splash: boolean, target: number, owner: number) {
        this.id = id;
        this.level = level;
        this.splash = splash;
        this.target = target;
        this.owner = owner;
    }
}
