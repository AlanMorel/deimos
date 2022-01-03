export class MapBreakableObject {
    public entityId: string;
    public isEnabled: boolean;
    public hideDuration: number;
    public resetDuration: number;

    public constructor(entityId: string, isEnabled: boolean, hideDuration: number, resetDuration: number) {
        this.entityId = entityId;
        this.isEnabled = isEnabled;
        this.hideDuration = hideDuration;
        this.resetDuration = resetDuration;
    }
}
