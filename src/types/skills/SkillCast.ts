import { DamageType } from "./DamageType";
import { Element } from "./Element";

export class SkillCast {
    public skillSN: BigInt;
    public entityId: number;
    public skillId: number;
    public skillLevel: number;
    public clientTick: number;
    public serverTick: number;
    public motionPoint: number;
    public attackPoint: number;
    public parentSkill?: SkillCast;

    public constructor(
        id: number = 1,
        level: number = 1,
        skillSN: BigInt,
        serverTick: number,
        entityId: number,
        clientTick: number,
        attackPoint: number
    ) {
        this.skillId = id;
        this.skillLevel = level;
        this.skillSN = skillSN;
        this.serverTick = serverTick;
        this.entityId = entityId;
        this.clientTick = clientTick;
        this.attackPoint = attackPoint;
        this.motionPoint = 1;
    }

    // TODO: Actual calculations
    public getDamageRate = (): number => {
        return 0.1;
    };

    public getCriticalDamage = (): number => {
        return 2 * this.getDamageRate();
    };

    public getSpiritCost = (): number => {
        return 15;
    };

    public getStaminaCost = (): number => {
        return 10;
    };

    public getSkillDamageType = (): DamageType => {
        return DamageType.NONE;
    };

    public getElement = (): Element => {
        return Element.NONE;
    };

    public isSpiritRecovery = (): boolean => {
        return false;
    };

    public durationTick = (): number => {
        return 5000;
    };

    public maxStack = (): number => {
        return 1;
    };

    public getConditionSkill = () => {
        return [];
    };

    public isHeal = (): boolean => {
        return false;
    };

    public isHealFromBuff = (): boolean => {
        return false;
    };

    public isGameMaster = (): boolean => {
        return false;
    };

    public isBuffToOwner = (): boolean => {
        return false;
    };

    public isBuffToEntity = (): boolean => {
        return false;
    };

    public isDebuffToEntity = (): boolean => false;

    public isDebuffToOwner = (): boolean => false;

    public isDebuffElement = (): boolean => false;

    public isChainSkill = (): boolean => false;

    public isBuffShield = (): boolean => false;

    public verifySkillTypeOf = (): boolean => false;
}
