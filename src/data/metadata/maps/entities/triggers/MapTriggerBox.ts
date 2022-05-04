import { CoordF } from "../../../../../types/coords/CoordF";
import { MapTriggerObject } from "./MapTriggerObject";

export class MapTriggerBox extends MapTriggerObject {
    public position: CoordF;
    public dimension: CoordF;

    public constructor(id: number, position: CoordF, dimension: CoordF) {
        super(id);
        this.position = position;
        this.dimension = dimension;
    }
}
