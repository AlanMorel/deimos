import { CoordS } from "../../../types/coords/CoordS";

export class WayPoint {
    public id: number;
    public isVisible: boolean;
    public position: CoordS;
    public rotation: CoordS;

    public constructor(id: number, isVisible: boolean, position: CoordS, rotation: CoordS) {
        this.id = id;
        this.isVisible = isVisible;
        this.position = position;
        this.rotation = rotation;
    }
}
