import { CoordF } from "../../../../../types/coords/CoordF";

export class MapEventNpcSpawnPoint {
    public id: number;
    public count: number;
    public npcIds: string[];
    public spawnAnimation: string;
    public spawnRadius: number;
    public position: CoordF;
    public rotation: CoordF;

    public constructor(
        id: number,
        count: number,
        npcIds: string[],
        spawnAnimation: string,
        spawnRadius: number,
        position: CoordF,
        rotation: CoordF
    ) {
        this.id = id;
        this.count = count;
        this.npcIds = npcIds;
        this.spawnAnimation = spawnAnimation;
        this.spawnRadius = spawnRadius;
        this.position = position;
        this.rotation = rotation;
    }
}
