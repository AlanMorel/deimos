import { CoordF } from "../../../../types/coords/CoordF";

export class MapLiftableTarget {
    public target: number;
    public position: CoordF;
    public shapeDimensions: CoordF;

    public constructor(target: number, position: CoordF, shapeDimensions: CoordF) {
        this.target = target;
        this.position = position;
        this.shapeDimensions = shapeDimensions;
    }
}
