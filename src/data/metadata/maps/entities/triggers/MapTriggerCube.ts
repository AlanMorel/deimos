import { MapTriggerObject } from "./MapTriggerObject";

export class MapTriggerCube extends MapTriggerObject {
    public isVisible: boolean;

    public constructor(id: number, isVisible: boolean) {
        super(id);
        this.isVisible = isVisible;
    }
}
