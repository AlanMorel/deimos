import { SkillTreeOrdered } from "../constants/SkillTreeOrdered";
import { Metadata } from "../data/metadata/Metadata";
import { SkillMetadata } from "../data/metadata/skills/SkillMetadata";
import { Job } from "./jobs/Job";

export class SkillTab {
    public uid: BigInt;
    public tabId: BigInt;
    public name: string;

    public order: number[];
    public skillJob: Map<number, SkillMetadata>;
    public skillLevels: Map<number, number>;

    public static addOnDictionary(job: Job): Map<number, SkillMetadata> {
        return new Map(
            Metadata.getSkills()
                .getJobSkills(job)
                .map(skill => [skill.skillId, skill])
        );
    }

    public constructor(uid: BigInt, tabId: BigInt, jobId: number, name: string, skillLevels?: Map<number, number>) {
        this.name = name;
        this.tabId = tabId;
        this.uid = uid;
        this.skillLevels = skillLevels ?? new Map();
        if (!skillLevels) {
            this.resetSkillTree(jobId as Job);
        }
        this.order = SkillTreeOrdered.getListForJob(jobId as Job);
        this.skillJob = SkillTab.addOnDictionary(jobId as Job);
    }

    public resetSkillTree(job: Job) {
        this.order = SkillTreeOrdered.getListForJob(job);
        this.skillJob = SkillTab.addOnDictionary(job);
        // TODO: SkillJob thing
        this.skillLevels = new Map([...this.skillJob.values()].map(entry => [entry.skillId, entry.currentLevel ?? 1]));
    }

    public getJobFeatureSkills(job: Job) {
        return Metadata.getSkills().getJobSkills(job);
    }

    public addOrUpdate(id: number, level: number, isLearned: boolean = true): void {
        // this.skillLevels[id] = isLearned ? level : 0;
        if (!this.skillJob.has(id)) {
            return;
        }

        for (const sub of this.skillJob.get(id)?.subSkills ?? []) {
            this.skillLevels.set(sub, level);
        }
    }

    public rename(name: string): void {
        this.name = name;
    }
}
