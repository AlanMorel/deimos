import { CoordF } from "../../types/coords/CoordF";

export abstract class FieldObject {
    public objectId: number = 0;
    public coord: CoordF = new CoordF(0, 0, 0);
}
