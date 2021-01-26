import fs from "fs";
import protobuf from "protobufjs";
import { ItemMetadata } from "./items/ItemMetadata";
import { ItemMetadataStorage } from "./items/ItemMetadataStorage";
import { MapMetadata } from "./maps/MapMetadata";
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

    public static load(): void {
        const items = this.deserialize<ItemMetadata>("item", "Item");
        this.items.load(items);

        const maps = this.deserialize<MapMetadata>("map-entity", "MapEntity");
        this.maps.load(maps);
    }

    private static deserialize<T>(slug: string, name: string): T[] {
        const root = protobuf.loadSync(process.cwd() + "/resources/proto/" + slug + ".proto");
        const buffer = fs.readFileSync(process.cwd() + "/resources/metadata/ms2-" + slug + "-metadata");

        const type = root.lookupType("List" + name + "Metadata");
        return type.decode(buffer).toJSON().items;
    }
}
