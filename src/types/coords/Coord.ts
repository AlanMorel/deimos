export abstract class Coord {
    public x: number;
    public y: number;
    public z: number;

    public constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public toString(): string {
        return "{x: " + this.x + ", y: " + this.y + ", z: " + this.z + "}";
    }
}
