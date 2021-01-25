import { CoordB } from "../../../../types/coords/CoordB";

export class MapObject {

    public coord: CoordB;
    public weaponId: number;

    public constructor(coord: CoordB, weaponId: number) {
        this.coord = coord;
        this.weaponId = weaponId;
    }
}
