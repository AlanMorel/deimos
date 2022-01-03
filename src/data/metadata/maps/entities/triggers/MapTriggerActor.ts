import { MapTriggerObject } from "./MapTriggerObject";

export class MapTriggerActor extends MapTriggerObject {
    public isVisible: boolean;
    public initialSequence: string;

    public constructor(id: number, isVisible: boolean, initialSequence: string) {
        super(id);
        this.isVisible = isVisible;
        this.initialSequence = initialSequence;
    }
}
