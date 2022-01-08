import { DamageType } from "../../../types/skills/DamageType";
import { SkillLevel } from "./SkillLevel";

export class SkillMetadata {
    public readonly skillId: number;
    public readonly skillLevels: SkillLevel[];
    public subSkills?: number[];
    public job?: number;
    public currentLevel?: number;
    public readonly state: string;
    public readonly damageType: DamageType;
    public readonly type: number;
    public readonly subType: number;
    public readonly element: number;
    public readonly superArmor: number;
    public readonly isSpiritRecovery: boolean;
    public maxLevel?: number;

    public constructor(
        id: number,
        skillLevels: SkillLevel[],
        state: string = "",
        damageType: DamageType = DamageType.NONE,
        type: number,
        subType: number,
        element: number,
        superArmor: number,
        isSpiritRecovery: boolean
    ) {
        this.skillId = id;
        this.skillLevels = skillLevels;
        this.state = state;
        this.damageType = damageType;
        this.type = type;
        this.subType = subType;
        this.element = element;
        this.superArmor = superArmor;
        this.isSpiritRecovery = isSpiritRecovery;
    }
    public toString(): string {
        return `Skill:(Id:${this.skillId},Job:${this.job},SkillLevel:[${this.skillLevels.join(",")}]`;
    }
}
