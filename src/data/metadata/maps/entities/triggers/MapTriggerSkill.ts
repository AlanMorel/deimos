import { CoordF } from "../../../../../types/coords/CoordF";
import { MapTriggerObject } from "./MapTriggerObject";

export class MapTriggerSkill extends MapTriggerObject {
    public position: CoordF;
    public count: number;
    public skillLevel: number;
    public skillId: number;

    public constructor(id: number, position: CoordF, count: number, skillLevel: number, skillId: number) {
        super(id);
        this.position = position;
        this.count = count;
        this.skillLevel = skillLevel;
        this.skillId = skillId;
    }
}
