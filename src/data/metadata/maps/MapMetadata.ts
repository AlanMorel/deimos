import { CoordS } from "../../../types/coords/CoordS";
import { MapBlock } from "./blocks/MapBlock";

export class MapMetadata {
    public id: number;
    public name: string;
    public blockName: string;
    public blocks: Map<CoordS, MapBlock>;

    public constructor(id: number, name: string, blockName: string, blocks: Map<CoordS, MapBlock>) {
        this.id = id;
        this.name = name;
        this.blockName = blockName;
        this.blocks = blocks;
    }
}
