import { ChatEmoticonAdd } from "./ChatEmoticonAdd";
import { HongBaoData } from "./HongBaoData";
import { InstallBillboard } from "./InstallBillboard";
import { LevelPotion } from "./LevelPotion";
import { OpenCoupleEffectBox } from "./OpenCoupleEffectBox";
import { OpenItemBox } from "./OpenItemBox";
import { OpenMassiveEvent } from "./OpenMassiveEvent";
import { SelectItemBox } from "./SelectItemBox";
import { SurvivalLevelExp } from "./SurvivalLevelExp";
import { SurvivalSkin } from "./SurvivalSkin";
import { VipCoupon } from "./VipCoupon";

export class ItemFunction {
    public name: string;
    public id: number;
    public openItemBox: OpenItemBox;
    public selectItemBox: SelectItemBox;
    public chatEmoticonAdd: ChatEmoticonAdd;
    public openMassiveEvent: OpenMassiveEvent;
    public levelPotion: LevelPotion;
    public vipCoupon: VipCoupon;
    public hongBao: HongBaoData;
    public openCoupleEffectBox: OpenCoupleEffectBox;
    public installBillboard: InstallBillboard;
    public survivalSkin: SurvivalSkin;
    public survivalLevelExp: SurvivalLevelExp;

    public constructor(
        name: string,
        id: number,
        openItemBox: OpenItemBox,
        selectItemBox: SelectItemBox,
        chatEmoticonAdd: ChatEmoticonAdd,
        openMassiveEvent: OpenMassiveEvent,
        levelPotion: LevelPotion,
        vipCoupon: VipCoupon,
        hongBao: HongBaoData,
        openCoupleEffectBox: OpenCoupleEffectBox,
        installBillboard: InstallBillboard,
        survivalSkin: SurvivalSkin,
        survivalLevelExp: SurvivalLevelExp
    ) {
        this.name = name;
        this.id = id;
        this.openItemBox = openItemBox;
        this.selectItemBox = selectItemBox;
        this.chatEmoticonAdd = chatEmoticonAdd;
        this.openMassiveEvent = openMassiveEvent;
        this.levelPotion = levelPotion;
        this.vipCoupon = vipCoupon;
        this.hongBao = hongBao;
        this.openCoupleEffectBox = openCoupleEffectBox;
        this.installBillboard = installBillboard;
        this.survivalSkin = survivalSkin;
        this.survivalLevelExp = survivalLevelExp;
    }

    public toString(): string {
        return `Function(name: ${this.name}, id: ${this.id})`;
    }
}
