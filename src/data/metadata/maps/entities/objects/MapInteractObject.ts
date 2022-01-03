import { InteractObjectType } from "../../../../../types/item/InteractObjectType";

export class MapInteractObject {
    public entityId: string;
    public interactId: number;
    public isEnabled: boolean;
    public type: InteractObjectType;

    public constructor(entityId: string, interactId: number, isEnabled: boolean, type: InteractObjectType) {
        this.entityId = entityId;
        this.interactId = interactId;
        this.isEnabled = isEnabled;
        this.type = type;
    }
}
