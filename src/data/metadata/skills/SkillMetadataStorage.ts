import { Job } from "../../../types/jobs/Job";
import { MetadataStorage } from "../MetadataStorage";
import { SkillMetadata } from "./SkillMetadata";

export class SkillMetadataStorage extends MetadataStorage<SkillMetadata> {
    public load(skills: SkillMetadata[]): void {
        skills.forEach(skill => {
            this.storage.set(skill.skillId, skill);
        });
    }

    public getSkill(skillId: number): SkillMetadata | undefined {
        return this.storage.get(skillId);
    }

    public getEmotes = (): number[] =>
        [...this.storage.entries()].filter(entry => entry[1].skillId / 100000 === 902).map(entry => entry[1].skillId);

    public getJobSkills(job: Job = Job.None): SkillMetadata[] {
        const jobSkills: SkillMetadata[] = [];
        if (Job.GameMaster === job) {
            return jobSkills;
        }

        for (const skill of [...this.storage.values()]) {
            if (skill.job === job) {
                jobSkills.push(skill);
            } else if (skill.skillId === 20000001) {
                skill.currentLevel = 1;
                jobSkills.push(skill);
            } else if (skill.skillId === 20000011) {
                skill.currentLevel = 1;
                jobSkills.push(skill);
            }
        }
        return jobSkills;
    }
}
