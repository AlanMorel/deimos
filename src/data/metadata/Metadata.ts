import { ItemMetadataStorage } from "./items/ItemMetadataStorage";

export class Metadata {

    private static items = new ItemMetadataStorage();

    public static getItems(): ItemMetadataStorage {
        return this.items;
    }
}
