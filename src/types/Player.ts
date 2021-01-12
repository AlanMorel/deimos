import { SkinColor } from "./color/SkinColor";
import { CoordF } from "./coords/CoordF";
import { Item } from "./item/Item";
import { ItemSlot } from "./item/ItemSlot";
import { Job } from "./jobs/Job";
import { JobCode } from "./jobs/JobCode";

export class Player {

    // bypass Key is constant PER ACCOUNT, seems like as long as it's valid, it doesn't matter
    public readonly unknownId: BigInt = BigInt(0x01EF80C2); // 0x01CC3721;

    // constants
    public accountId: BigInt = BigInt(1);
    public characterId: BigInt = BigInt(1);
    public creationTime: BigInt = BigInt(0);
    public name: string;
    public gender: number; // 0 = male, 1 = female

    public jobGroupId: number; // according to jobgroupname.xml
    public awakened: boolean = false;

    // Mutable Values
    public mapId: number = 0;
    public level: number = 1;
    public experience: BigInt = BigInt(0);
    public restExperience: BigInt = BigInt(0);
    public prestigeLevel: number = 100;
    public prestigeExperience: BigInt = BigInt(0);
    public titleId: number = 0;
    public insigniaId: number = 0;
    public animation: number = 0;

    // Combat, Adventure, Lifestyle
    public trophy: number[] = new Array(3);

    public coord: CoordF = new CoordF(0, 0, 0);
    public rotation: CoordF = new CoordF(0, 0, 0);

    // Appearance
    public skinColor: SkinColor;

    public guildName = "";
    public profileUrl = "";
    public motto = "Motto";
    public homeName = "";

    // currency
    public mesos: BigInt = BigInt(0);
    public merets: BigInt = BigInt(0);
    public valorToken: BigInt = BigInt(0);
    public treva: BigInt = BigInt(0);
    public rue: BigInt = BigInt(0);
    public haviFruit: BigInt = BigInt(0);
    public mesoToken: BigInt = BigInt(0);

    public maxSkillTabs: number = 0;
    public activeSkillTabId: BigInt = BigInt(0);

    public equips = new Map<ItemSlot, Item>();
    public equipSlots: ItemSlot[] = new Array<ItemSlot>();

    public jobType: Job = Job.None;

    public constructor(gender: number, jobGroupId: number, name: string, skinColor: SkinColor, equips: Map<ItemSlot, Item>) {
        this.gender = gender;
        this.jobGroupId = jobGroupId;
        this.name = name;
        this.skinColor = skinColor;
        this.equips = equips;
    }

    public getJobId(): number {
        return this.jobGroupId * 10 + (this.awakened ? 1 : 0);
    }

    private getDefaultEquipSlot(): ItemSlot {
        return this.equipSlots.length > 0 ? this.equipSlots[0] : ItemSlot.NONE;
    }

    public isBeauty(): boolean {
        const slots = [
            ItemSlot.HR,
            ItemSlot.FA,
            ItemSlot.FD,
            ItemSlot.CL,
            ItemSlot.PA,
            ItemSlot.SH,
            ItemSlot.ER
        ];
        const defaultEquipSlot = this.getDefaultEquipSlot();
        for (const slot of slots) {
            if (defaultEquipSlot == slot) {
                return true;
            }
        }
        return false;
    }

    public getJobCode(): JobCode {
        return this.jobType != Job.GameMaster ? (this.jobType / 10) : JobCode.GameMaster;
    }
}
