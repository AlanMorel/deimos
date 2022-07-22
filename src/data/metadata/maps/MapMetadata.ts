import { MapNpc } from "@/data/metadata/maps/npcs/MapNpc";
import { MapObject } from "@/data/metadata/maps/objects/MapObject";
import { MapPortal } from "@/data/metadata/maps/portals/MapPortal";
import { MapPlayerSpawn } from "@/data/metadata/maps/spawns/MapPlayerSpawn";

export class MapMetadata {
    public id: number;
    public npcs: MapNpc[];
    public portals: MapPortal[];
    public playerSpawns: MapPlayerSpawn[];
    public objects: MapObject[];

    public constructor(
        id: number,
        npcs: MapNpc[],
        portals: MapPortal[],
        playerSpawns: MapPlayerSpawn[],
        objects: MapObject[]
    ) {
        this.id = id;
        this.npcs = npcs;
        this.portals = portals;
        this.playerSpawns = playerSpawns;
        this.objects = objects;
    }
}
