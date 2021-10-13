import { CoordS } from "../../../../types/coords/CoordS";
import { MapPortalFlag } from "./MapPortalFlag";

export class MapPortal {
    public id: number;
    public flags: MapPortalFlag;
    public target: number;
    public coord: CoordS;
    public rotation: CoordS;

    public constructor(id: number, flags: MapPortalFlag, target: number, coord: CoordS, rotation: CoordS) {
        this.id = id;
        this.flags = flags;
        this.target = target;
        this.coord = coord;
        this.rotation = rotation;
    }
}
