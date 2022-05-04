import { MapBreakableObject } from "./MapBreakableObject";

export class MapBreakableNifObject extends MapBreakableObject {
    public triggerId: number;

    public constructor(id: string, isEnabled: boolean, hideDuration: number, resetDuration: number, triggerId: number) {
        super(id, isEnabled, hideDuration, resetDuration);
        this.triggerId = triggerId;
    }
}
