export class SkillAttack {
    public readonly attackPoint: number;
    public readonly targetCount: number;
    public readonly magicPathId: BigInt;
    public readonly cubeMagicPathId: BigInt;

    public constructor(attackPoint: number, targetCount: number, magicPathId: BigInt, cubeMagicPathId: BigInt) {
        this.attackPoint = attackPoint;
        this.targetCount = targetCount;
        this.magicPathId = magicPathId;
        this.cubeMagicPathId = cubeMagicPathId;
    }

    public toString(): string {
        return `Point:${this.attackPoint}, TargetCount:${this.targetCount}, MagicPathId:${this.magicPathId}`;
    }
}
