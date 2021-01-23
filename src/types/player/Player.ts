import { ChannelSession } from "../../network/sessions/ChannelSession";
import { Color } from "../color/Color";
import { SkinColor } from "../color/SkinColor";
import { CoordF } from "../coords/CoordF";
import { Inventory } from "../inventory/Inventory";
import { Item } from "../item/Item";
import { ItemSlot } from "../item/ItemSlot";
import { Job } from "../jobs/Job";
import { Mount } from "../Mount";
import { GameOptions } from "../options/GameOptions";
import { SkillTab } from "../SkillTab";
import { StatDistribution } from "../StatDistribution";
import { Gender } from "./Gender";
import { PlayerStats } from "./PlayerStats";
import { Wallet } from "./Wallet";

export class Player {

    // bypass Key is constant PER ACCOUNT, seems like as long as it's valid, it doesn't matter
    public readonly unknownId: BigInt = BigInt(0x01EF80C2); // 0x01CC3721;

    // constants
    public accountId: BigInt = 1n;
    public characterId: BigInt;
    public creationTime: BigInt = 0n;
    public name: string;
    public gender: Gender;

    // mutable Values
    public mapId: number = 2000023;
    public level: number = 1;
    public objectId: number = 0;
    public experience: BigInt = 0n;
    public restExperience: BigInt = 0n;
    public prestigeLevel: number = 100;
    public prestigeExperience: BigInt = 0n;
    public titleId: number = 0;
    public insigniaId: number = 0;
    public animation: number = 0;
    public stats: PlayerStats = new PlayerStats();
    public mount?: Mount;

    // combat, adventure, lifestyle
    public trophy: number[] = new Array(3);

    public coord: CoordF = new CoordF(-39, -4347, 9001);
    public rotation: CoordF = new CoordF(0, 0, 0);

    // appearance
    public skinColor: SkinColor;

    public guildName = "";
    public profileUrl = "";
    public motto = "Motto";
    public homeName = "";

    public wallet: Wallet;

    public maxSkillTabs: number = 0;
    public activeSkillTabId: BigInt = 0n;
    public skillTabs = new Array<SkillTab>();
    public statPointDistribution: StatDistribution = new StatDistribution();

    public equips = new Map<ItemSlot, Item>();
    public equipSlots: ItemSlot[] = new Array<ItemSlot>();

    public jobGroupId: Job; // jobgroupname.xml
    public awakened: boolean = false;

    public gameOptions: GameOptions = new GameOptions();

    public inventory: Inventory;

    public session?: ChannelSession;

    public constructor(characterId: BigInt, gender: Gender, jobGroupId: Job, name: string, skinColor: SkinColor, equips: Map<ItemSlot, Item> = new Map<ItemSlot, Item>()) {
        this.characterId = characterId;
        this.gender = gender;
        this.jobGroupId = jobGroupId;
        this.name = name;
        this.skinColor = skinColor;
        this.equips = equips;
        this.inventory = new Inventory(this, 48);
        this.wallet = new Wallet(this);
    }

    public static getInitialPlayer(): Player {
        return new Player(-1n, Gender.Male, -1, "", new SkinColor(new Color(0, 0, 0, -1), new Color(0, 0, 0, -1)), new Map<ItemSlot, Item>());
    }

    public getJobId(): number {
        return this.jobGroupId + (this.awakened ? 1 : 0);
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
}
