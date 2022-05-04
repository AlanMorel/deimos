import { CoordS } from "../../../types/coords/CoordS";
import { MetadataStorage } from "../MetadataStorage";
import { MapEntityMetadata } from "./MapEntityMetadata";
import { MapPortalFlag } from "./entities/portals/MapPortalFlag";

export class MapEntityMetadataStorage extends MetadataStorage<MapEntityMetadata> {
    public getMap(id: number): MapEntityMetadata | undefined {
        return this.storage.get(id);
    }

    public load(maps: MapEntityMetadata[]): void {
        maps.forEach(map => {
            map.portals?.forEach(portal => {
                const flagName = portal.flags ? portal.flags : MapPortalFlag[MapPortalFlag.None];
                const flags = MapPortalFlag[flagName as keyof typeof MapPortalFlag];
                portal.flags = flags;
            });

            const mapMetadata = new MapEntityMetadata(
                map.id,
                map.npcs,
                map.portals,
                map.playerSpawns,
                map.mobSpawns,
                map.weaponObjects,
                map.boundingBox0,
                map.boundingBox1,
                map.healingSpots,
                map.patrolDatum,
                map.wayPoints,
                map.triggerMeshes,
                map.triggerEffects,
                map.triggerCameras,
                map.triggerBoxes,
                map.triggerLadders,
                map.eventNpcSpawnPoints,
                map.triggerActors,
                map.triggerCubes,
                map.triggerSounds,
                map.triggerRopes,
                map.breakableActors,
                map.breakableNifs,
                map.vibrateObjects,
                map.triggerSkills,
                map.interactObjects,
                map.liftableObjects,
                map.liftableTarget
            );
            this.storage.set(map.id, mapMetadata);
        });
    }
}
