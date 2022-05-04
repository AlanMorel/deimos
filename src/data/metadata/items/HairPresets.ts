import { CoordF } from "../../../types/coords/CoordF";

export class HairPresets {
    public backPositionCoord: CoordF;
    public backPositionRotation: CoordF;
    public frontPositionCoord: CoordF;
    public frontPositionRotation: CoordF;
    public minScale: number;
    public maxScale: number;

    public constructor(
        backPositionCoord: CoordF,
        backPositionRotation: CoordF,
        frontPositionCoord: CoordF,
        frontPositionRotation: CoordF,
        minScale: number,
        maxScale: number
    ) {
        this.backPositionCoord = backPositionCoord;
        this.backPositionRotation = backPositionRotation;
        this.frontPositionCoord = frontPositionCoord;
        this.frontPositionRotation = frontPositionRotation;
        this.minScale = minScale;
        this.maxScale = maxScale;
    }

    public toString(): string {
        return `HairPreset(backPosCoord: ${this.backPositionCoord}, backPosRotation: ${this.backPositionRotation},
            frontPosCoord: ${this.frontPositionCoord}, frontPosRotation: ${this.frontPositionRotation},
            minScale: ${this.minScale}, maxScale: ${this.maxScale})`;
    }
}
