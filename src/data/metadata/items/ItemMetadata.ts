import { InventoryTab } from "../../../types/inventory/InventoryTab";
import { GemSlot } from "../../../types/item/GemSlot";
import { ItemGender } from "../../../types/item/ItemGender";
import { ItemHousingCategory } from "../../../types/item/ItemHousingCategory";
import { ItemSlot } from "../../../types/item/ItemSlot";
import { MedalSlot } from "../../../types/item/MedalSlot";
import { TransferType } from "../../../types/item/TransferType";
import { Job } from "../../../types/jobs/Job";
import { HairPresets } from "./HairPresets";
import { ItemBreakReward } from "./ItemBreakReward";
import { ItemFunction } from "./ItemFunction";

export class ItemMetadata {
    public id: number;
    public name: string;
    public slot: ItemSlot;
    public gem: GemSlot;
    public medal: MedalSlot;
    public tab: InventoryTab;
    public rarity: number;
    public stackLimit: number;
    public enableBreak: boolean;
    public sellable: boolean;
    public transferType: TransferType;
    public tradeableCount: number;
    public repackagedCount: number;
    public repackageItemConsumeCount: number;
    public isTwoHand: boolean;
    public isDress: boolean;
    public isTemplate: boolean;
    public gender: ItemGender;
    public playCount: number;
    public isCustomScore: number;
    public sellPrice: number[];
    public sellPriceCustom: number[];
    public fileName: string;
    public skillId: number;
    public recommendedJobs: Job[];
    public breakRewards: ItemBreakReward[];
    public functionData: ItemFunction;
    public tag: string;
    public shopId: number;
    public level: number;
    public hairPresets: HairPresets[];
    public colorIndex: number;
    public colorPalette: number;
    public optionStatic: number;
    public optionRandom: number;
    public optionConstant: number;
    public optionLevelFactor: number;
    public isCubeSolid: boolean;
    public housingCategory: ItemHousingCategory;
    public objectId: number;
    public blackMarketCategory: string;
    public category: string;

    public constructor(
        id: number,
        name: string,
        slot: ItemSlot,
        gem: GemSlot,
        medal: MedalSlot,
        tab: InventoryTab,
        rarity: number,
        stackLimit: number,
        enableBreak: boolean,
        sellable: boolean,
        transferType: TransferType,
        tradeableCount: number,
        repackagedCount: number,
        repackagedItemConsumeCount: number,
        isTwoHand: boolean,
        isDress: boolean,
        isTemplate: boolean,
        gender: ItemGender,
        playCount: number,
        isCustomScore: number,
        sellPrice: number[],
        sellPriceCustom: number[],
        fileName: string,
        skillId: number,
        recommendedJobs: Job[],
        breakRewards: ItemBreakReward[],
        functionData: ItemFunction,
        tag: string,
        shopId: number,
        level: number,
        hairPresets: HairPresets[],
        colorIndex: number,
        colorPalette: number,
        optionStatic: number,
        optionRandom: number,
        optionConstant: number,
        optionLevelFactor: number,
        isCubeSolid: boolean,
        housingCategory: ItemHousingCategory,
        objectId: number,
        blackMarketCategory: string,
        category: string
    ) {
        this.id = id;
        this.name = name;
        this.gem = gem;
        this.medal = medal;
        this.rarity = rarity;
        this.stackLimit = stackLimit;
        this.enableBreak = enableBreak;
        this.sellable = sellable;
        this.transferType = transferType;
        this.tradeableCount = tradeableCount;
        this.repackagedCount = repackagedCount;
        this.repackageItemConsumeCount = repackagedItemConsumeCount;
        this.isTwoHand = isTwoHand;
        this.isDress = isDress;
        this.gender = gender;
        this.playCount = playCount;
        this.slot = slot;
        this.tab = tab;
        this.isTemplate = isTemplate;
        this.isCustomScore = isCustomScore;
        this.sellPrice = sellPrice;
        this.sellPriceCustom = sellPriceCustom;
        this.fileName = fileName;
        this.skillId = skillId;
        this.recommendedJobs = recommendedJobs;
        this.breakRewards = breakRewards;
        this.functionData = functionData;
        this.tag = tag;
        this.shopId = shopId;
        this.level = level;
        this.hairPresets = hairPresets;
        this.colorIndex = colorIndex;
        this.colorPalette = colorPalette;
        this.optionStatic = optionStatic;
        this.optionRandom = optionRandom;
        this.optionConstant = optionConstant;
        this.optionLevelFactor = optionLevelFactor;
        this.isCubeSolid = isCubeSolid;
        this.housingCategory = housingCategory;
        this.objectId = objectId;
        this.blackMarketCategory = blackMarketCategory;
        this.category = category;
    }
}
