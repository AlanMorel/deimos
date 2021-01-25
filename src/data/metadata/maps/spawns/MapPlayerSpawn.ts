import { CoordS } from "../../../../types/coords/CoordS";

export class MapPlayerSpawn {

    public coord: CoordS;
    public rotation: CoordS;

    public constructor(coord: CoordS, rotation: CoordS) {
        this.coord = coord;
        this.rotation = rotation;
    }
}
