export class MapLiftableObject {
    public entityId: string;
    public itemId: number;
    public effectQuestId: string;
    public effectQuestState: string;
    public itemLifeTime: number;
    public liftableRegenCheckTime: number;

    public constructor(
        entityId: string,
        itemId: number,
        effectQuestId: string,
        effectQuestState: string,
        itemLifeTime: number,
        liftableRegenCheckTime: number
    ) {
        this.entityId = entityId;
        this.itemId = itemId;
        this.effectQuestId = effectQuestId;
        this.effectQuestState = effectQuestState;
        this.itemLifeTime = itemLifeTime;
        this.liftableRegenCheckTime = liftableRegenCheckTime;
    }
}
