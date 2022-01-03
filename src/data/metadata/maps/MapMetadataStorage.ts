import { CoordS } from "../../../types/coords/CoordS";
import { MetadataStorage } from "../MetadataStorage";
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

    public blockExists(mapId: number, coord: CoordS) {
        const mapMetadata: MapMetadata | undefined = this.getMap(mapId);
        // if(mapMetadata.)
    }
}
