import { CoordS } from "../../../../types/coords/CoordS";

export class MapBlock {
    public coord: CoordS;
    public attribute: string;
    public type: string;
    public saleableGroup: number;

    public constructor(coord: CoordS, attribute: string, type: string, saleableGroup: number) {
        this.coord = coord;
        this.attribute = attribute;
        this.type = type;
        this.saleableGroup = saleableGroup;
    }
}
