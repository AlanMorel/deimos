import fs from "fs";
import protobuf from "protobufjs";
import { Logger } from "../../tools/Logger";
import { ItemMetadata } from "./items/ItemMetadata";
import { Metadata } from "./Metadata";

export class MetadataLoader {

    public static load(): void {
        const items = this.decode<ItemMetadata>("item", "Item");
        Metadata.getItems().load(items);


        Logger.log("Metadata loaded successfully");
    }

    private static decode<T>(slug: string, name: string): T[] {
        const root = protobuf.loadSync(process.cwd() + "/resources/proto/" + slug + ".proto");
        const buffer = fs.readFileSync(process.cwd() + "/resources/metadata/ms2-" + slug + "-metadata");

        const type = root.lookupType("List" + name + "Metadata");
        return type.decode(buffer).toJSON().items;
    }
}
