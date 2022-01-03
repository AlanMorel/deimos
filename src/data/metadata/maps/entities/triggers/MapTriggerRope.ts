import { MapTriggerObject } from "./MapTriggerObject";

export class MapTriggerRope extends MapTriggerObject {
    public isVisible: boolean;

    public constructor(id: number, isVisible: boolean) {
        super(id);
        this.isVisible = isVisible;
    }
}
