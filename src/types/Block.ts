import { CoordF } from "./coords/CoordF";
import { CoordS } from "./coords/CoordS";

export class Block {
    public static BLOCK_SIZE: number = 150;

    public static closestBlockF(coord: CoordF): CoordF {
        return new CoordF(
            Math.round(coord.x / this.BLOCK_SIZE) * this.BLOCK_SIZE,
            Math.round(coord.y / this.BLOCK_SIZE) * this.BLOCK_SIZE,
            Math.round(coord.z / this.BLOCK_SIZE) * this.BLOCK_SIZE
        );
    }

    public static closestBlockS(coord: CoordS): CoordS {
        return new CoordS(
            Math.round(coord.x / this.BLOCK_SIZE) * this.BLOCK_SIZE,
            Math.round(coord.y / this.BLOCK_SIZE) * this.BLOCK_SIZE,
            Math.round(coord.z / this.BLOCK_SIZE) * this.BLOCK_SIZE
        );
    }
}
