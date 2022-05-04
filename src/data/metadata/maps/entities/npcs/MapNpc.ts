import { CoordS } from "../../../../../types/coords/CoordS";

export class MapNpc {
    public id: number;
    public coord: CoordS;
    public rotation: CoordS;

    public constructor(id: number, coord: CoordS, rotation: CoordS) {
        this.id = id;
        this.coord = coord;
        this.rotation = rotation;
    }
}
