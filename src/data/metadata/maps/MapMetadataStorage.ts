import { CoordB } from "../../../types/coords/CoordB";
import { CoordS } from "../../../types/coords/CoordS";
import { MetadataStorage } from "../MetadataStorage";
import { MapBlock } from "./blocks/MapBlock";
import { MapMetadata } from "./MapMetadata";

export class MapMetadataStorage extends MetadataStorage<MapMetadata> {
    public getMap(id: number): MapMetadata | undefined {
        return this.storage.get(id);
    }

    public load(maps: MapMetadata[]): void {
        maps.forEach(map => {
            const mapMetadata = new MapMetadata(map.id, map.name, map.blockName, map.blocks);
            this.storage.set(map.id, mapMetadata);
        });
    }

    public getMapBlock(mapId: number, coord: CoordS): MapBlock | null {
        const mapMetadata: MapMetadata | undefined = this.getMap(mapId);

        if (!mapMetadata) {
            return null;
        }

        const block = mapMetadata.blocks.get(coord);
        return block ?? null;
    }

    public blockExists(mapId: number, coord: CoordS): boolean {
        return !!this.getMapBlock(mapId, coord);
    }

    public blockExistsAbove(mapId: number, coord: CoordS): boolean {
        return !!this.getMapBlock(mapId, { ...coord, z: coord.z + 1 } as CoordS);
    }

    // TODO: Implement getPlotNumber
    public getPlotNumber(mapId: number, coord: CoordS) {
        return 0;
    }
}
