import { CoordS } from "../../../../../types/coords/CoordS";
import { SpawnMetadata } from "./SpawnMetadata";

export class MapMobSpawn {
    public id: number;
    public coord: CoordS;
    public npcCount: number;
    public npcList: number[];
    public spawnRadius: number;
    public spawnData: SpawnMetadata;

    public constructor(
        id: number,
        coord: CoordS,
        npcCount: number,
        npcList: number[],
        spawnRadius: number,
        spawnData: SpawnMetadata
    ) {
        this.id = id;
        this.coord = coord;
        this.npcCount = npcCount;
        this.npcList = npcList;
        this.spawnRadius = spawnRadius;
        this.spawnData = spawnData;
    }
}
