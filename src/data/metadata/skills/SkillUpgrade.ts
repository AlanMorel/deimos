export class SkillUpgrade {
    public readonly levelRequired: number;
    public readonly skillIdsRequired: number[];
    public readonly skillLevelsRequired: number[];

    public constructor(levelRequired: number = 0, skillIdsRequired: number[] = [], skillLevelsRequired: number[] = []) {
        this.levelRequired = levelRequired;
        this.skillIdsRequired = skillIdsRequired;
        this.skillLevelsRequired = skillLevelsRequired;
    }

    public toString(): string {
        return `LevelRequired: ${this.levelRequired},SkillIds[:${this.skillIdsRequired.join(
            ","
        )}], SkillLevels: [${this.skillLevelsRequired.join(",")}]`;
    }
}
