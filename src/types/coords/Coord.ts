export abstract class Coord {

    public X: number;
    public Y: number;
    public Z: number;

    public constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.X = x;
        this.Y = y;
        this.Z = z;
    }

    public toString(): string {
        return "{x: " + this.X + ", y: " + this.Y + ", z: " + this.Z + "}";
    }
}
