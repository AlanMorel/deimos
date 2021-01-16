import { Skill } from "./Skill";

export class SkillTab {

    public id: BigInt;
    public name: string;
    public order: Array<number>;
    public split: number;
    public skills: Map<number, Skill>;

    public constructor(name: string, order: Array<number> = [], split: number = 8, skills: Map<number, Skill> = new Map<number, Skill>()) {
        this.id = BigInt(0x000032DF995949B9); // temporary hard coded id
        this.name = name;
        this.order = order;
        this.split = split;
        this.skills = skills != null ? skills : new Map<number, Skill>();

        // Add default skills
        this.addOrUpdate(new Skill(20000001, 1, 1)); // Swift Swimming
        this.addOrUpdate(new Skill(20000011, 1, 1)); // Wall Climbing
    }

    public addOrUpdate(skill: Skill): void {
        this.skills.set(skill.id, skill);

        // Recursive add or update for sub skills
        if (skill.sub != null) {
            for (const sub of skill.sub) {
                this.addOrUpdate(new Skill(sub, skill.level, skill.learned, skill.feature));
            }
        }
    }

    public rename(name: string): void {
        this.name = name;
    }
}
