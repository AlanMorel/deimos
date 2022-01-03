import { MedalSlot } from "../../../types/item/MedalSlot";

export class SurvivalSkin {
    public id: number;
    public medalSlot: MedalSlot;

    public constructor(id: number, medalSlot: MedalSlot) {
        this.id = id;
        this.medalSlot = medalSlot;
    }
}
