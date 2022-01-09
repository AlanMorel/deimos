import { Job } from "../types/jobs/Job";

export enum JobSkillSplit {
    None = 0,
    Knight = 9,
    Berserker = 15,
    Wizard = 17,
    Priest = 10,
    Archer = 14,
    HeavyGunner = 13,
    Thief = HeavyGunner,
    Assassin = 8,
    Runeblade = Assassin,
    Striker = 12,
    SoulBinder = 16,
    GameMaster = 1,
    Beginner = GameMaster
}

export function getJobSkillSplitByJobId(job: Job): JobSkillSplit {
    switch (job) {
        case Job.Knight:
            return JobSkillSplit.Knight;
        case Job.Berserker:
            return JobSkillSplit.Berserker;
        case Job.Wizard:
            return JobSkillSplit.Wizard;
        case Job.Priest:
            return JobSkillSplit.Priest;
        case Job.Archer:
            return JobSkillSplit.Archer;
        case Job.HeavyGunner:
            return JobSkillSplit.HeavyGunner;
        case Job.Thief:
            return JobSkillSplit.Thief;
        case Job.Assassin:
            return JobSkillSplit.Assassin;
        case Job.Runeblade:
            return JobSkillSplit.Runeblade;
        case Job.Striker:
            return JobSkillSplit.Striker;
        case Job.SoulBinder:
            return JobSkillSplit.SoulBinder;
        case Job.GameMaster:
            return JobSkillSplit.GameMaster;
        case Job.Beginner:
            return JobSkillSplit.Beginner;
        default:
            return JobSkillSplit.None;
    }
}
