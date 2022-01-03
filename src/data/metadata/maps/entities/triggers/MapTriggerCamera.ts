import { MapTriggerObject } from "./MapTriggerObject";

export class MapTriggerCamera extends MapTriggerObject {
    public isEnabled: boolean;

    public constructor(id: number, isEnabled: boolean) {
        super(id);
        this.isEnabled = isEnabled;
    }
}
