import { MapMetadata } from "@/data/metadata/maps/MapMetadata";
import { MapPortalFlag } from "@/data/metadata/maps/portals/MapPortalFlag";
import { MetadataStorage } from "@/data/metadata/MetadataStorage";

export class MapMetadataStorage extends MetadataStorage<MapMetadata> {
    public getMap(id: number): MapMetadata | undefined {
        return this.storage.get(id);
    }

    public load(maps: MapMetadata[]): void {
        maps.forEach(map => {
            map.portals?.forEach(portal => {
                const flagName = portal.flags ? portal.flags : MapPortalFlag[MapPortalFlag.None];
                const flags = MapPortalFlag[flagName as keyof typeof MapPortalFlag];
                portal.flags = flags;
            });

            const mapMetadata = new MapMetadata(map.id, map.npcs, map.portals, map.playerSpawns, map.objects);
            this.storage.set(map.id, mapMetadata);
        });
    }
}
