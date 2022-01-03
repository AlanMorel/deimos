import { MapTriggerObject } from "./MapTriggerObject";

export class MapTriggerSound extends MapTriggerObject {
    public isEnabled: boolean;

    public constructor(id: number, isEnabled: boolean) {
        super(id);
        this.isEnabled = isEnabled;
    }
}
