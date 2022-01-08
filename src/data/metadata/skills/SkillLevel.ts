import { SkillAdditionalData } from "./SkillAdditionalData";
import { SkillAttack } from "./SkillAttack";
import { SkillCondition } from "./SkillCondition";
import { SkillMotion } from "./SkillMotion";
import { SkillUpgrade } from "./SkillUpgrade";

export class SkillLevel {
    public readonly level: number;
    public readonly spirit?: number;
    public readonly stamina?: number;
    public readonly damageRate?: number;
    public readonly feature?: string;
    public readonly skillMotions?: SkillMotion;
    public readonly skillAttacks?: SkillAttack[];
    public readonly skillConditions?: SkillCondition[];
    public readonly skillUpgrade?: SkillUpgrade;

    public skillAdditionalData?: SkillAdditionalData;

    public constructor(
        level: number,
        skillAdditionalData?: SkillAdditionalData,
        spirit?: number,
        stamina?: number,
        damageRate?: number,
        feature?: string,
        skillMotions?: SkillMotion,
        skillAttacks?: SkillAttack[],
        skillConditions?: SkillCondition[],
        skillUpgrade?: SkillUpgrade
    ) {
        this.level = level;
        this.skillAdditionalData = skillAdditionalData ?? new SkillAdditionalData();
        this.spirit = spirit;
        this.stamina = stamina;
        this.damageRate = damageRate;
        this.feature = feature;
        this.skillMotions = skillMotions ?? new SkillMotion();
        this.skillAttacks = skillAttacks;
        this.skillConditions = skillConditions;
        this.skillUpgrade = skillUpgrade;
    }

    public toString(): string {
        return `SkillLevel(Level:${this.level},Spirit:${this.spirit},Stamina:${this.stamina},DamageRate:${this.damageRate},
            Feature:${this.feature},SkillMotion:${this.skillMotions},SkillAttacks:${this.skillAttacks},SkillConditions:${this.skillConditions})`;
    }
}
