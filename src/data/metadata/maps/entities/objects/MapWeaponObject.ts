import { CoordB } from "../../../../../types/coords/CoordB";

export class MapWeaponObject {
    public coord: CoordB;
    public weaponItemIds: number[];

    public constructor(coord: CoordB, weaponItemIds: number[]) {
        this.coord = coord;
        this.weaponItemIds = weaponItemIds;
    }
}
