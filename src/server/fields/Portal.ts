import { CoordF } from "../../types/coords/CoordF";
import { FieldObject } from "./FieldObject";

export class Portal extends FieldObject {

    public id: number;
    public isVisible: boolean;
    public isEnabled: boolean;
    public isMinimapVisible: boolean;
    public rotation: CoordF;
    public targetMapId: number;

    public constructor(id: number, isVisible: boolean, isEnabled: boolean, isMinimapVisible: boolean, rotation: CoordF, targetMapId: number) {
        super();
        this.id = id;
        this.isVisible = isVisible;
        this.isEnabled = isEnabled;
        this.isMinimapVisible = isMinimapVisible;
        this.rotation = rotation;
        this.targetMapId = targetMapId;
    }
}
