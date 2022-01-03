import { MapBreakableObject } from "./MapBreakableObject";

export class MapBreakableActorObject extends MapBreakableObject {
    public constructor(id: string, isEnabled: boolean, hideDuration: number, resetDuration: number) {
        super(id, isEnabled, hideDuration, resetDuration);
    }
}
