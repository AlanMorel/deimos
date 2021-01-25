import { MapNpc } from "./npcs/MapNpc";
import { MapObject } from "./objects/MapObject";
import { MapPortal } from "./portals/MapPortal";
import { MapPlayerSpawn } from "./spawns/MapPlayerSpawn";

export class MapMetadata {

    public id: number;
    public npcs: MapNpc[];
    public portals: MapPortal[];
    public playerSpawns: MapPlayerSpawn[];
    public objects: MapObject[];

    public constructor(id: number, npcs: MapNpc[], portals: MapPortal[], playerSpawns: MapPlayerSpawn[], objects: MapObject[]) {
        this.id = id;
        this.npcs = npcs;
        this.portals = portals;
        this.playerSpawns = playerSpawns;
        this.objects = objects;
    }
}
