import { ItemMetadataStorage } from "./items/ItemMetadataStorage";
import { MapMetadataStorage } from "./maps/MapMetadataStorage";

export class Metadata {

    private static items = new ItemMetadataStorage();
    private static maps = new MapMetadataStorage();

    public static getItems(): ItemMetadataStorage {
        return this.items;
    }

    public static getMaps(): MapMetadataStorage {
        return this.maps;
    }
}
