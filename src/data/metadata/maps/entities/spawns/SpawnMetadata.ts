export class SpawnMetadata {
    public difficulty: number;
    public minDifficulty: number;
    public tags: string[];
    public spawnTime: number;
    public population: number;
    public isPetSpawn: boolean;

    public constructor(
        difficulty: number,
        minDifficulty: number,
        tags: string[],
        spawnTime: number,
        population: number,
        isPetSpawn: boolean
    ) {
        this.difficulty = difficulty;
        this.minDifficulty = minDifficulty;
        this.tags = tags;
        this.spawnTime = spawnTime;
        this.population = population;
        this.isPetSpawn = isPetSpawn;
    }
}
