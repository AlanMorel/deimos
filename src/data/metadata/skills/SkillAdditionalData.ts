export class SkillAdditionalData {
    public readonly duration: number;
    public readonly buffType: number;
    public readonly buffSubType: number;
    public readonly buffCategory: number;
    public readonly eventBuff: number = 0;
    public readonly maxStack: number;
    public readonly keepCondition: number;

    public constructor(
        duration: number = 1,
        buffType: number = 1,
        buffSubType: number = 1,
        buffCategory: number = 1,
        maxStack: number = 1,
        keepCondition: number = 0
    ) {
        this.duration = duration;
        this.buffType = buffType;
        this.buffSubType = buffSubType;
        this.buffCategory = buffCategory;
        this.maxStack = maxStack;
        this.keepCondition = keepCondition;
    }
}
