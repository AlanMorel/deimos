import chalk from "chalk";
import fs from "fs";
import protobuf from "protobufjs";
import { Logger } from "../../tools/Logger";
import { ItemMetadata } from "./items/ItemMetadata";
import { ItemMetadataStorage } from "./items/ItemMetadataStorage";
import { MapEntityMetadata } from "./maps/MapEntityMetadata";
import { MapEntityMetadataStorage } from "./maps/MapEntityMetadataStorage";
import { MapMetadata } from "./maps/MapMetadata";
import { MapMetadataStorage } from "./maps/MapMetadataStorage";
import { SkillMetadata } from "./skills/SkillMetadata";
import { SkillMetadataStorage } from "./skills/SkillMetadataStorage";

export class Metadata {
    private static items = new ItemMetadataStorage();
    private static mapEntities = new MapEntityMetadataStorage();
    private static maps = new MapMetadataStorage();
    private static skills = new SkillMetadataStorage();

    public static getItems(): ItemMetadataStorage {
        return this.items;
    }

    public static getMapEntities(): MapEntityMetadataStorage {
        return this.mapEntities;
    }

    public static getMaps(): MapMetadataStorage {
        return this.maps;
    }

    public static load(): void {
        Logger.log("Loading Items Metadata", chalk.green);
        const items = this.deserialize<ItemMetadata>("item", "Item");
        this.items.load(items);
        Logger.log("Item Metadata Loaded", chalk.green);

        Logger.log("Loading Map Entities Metadata", chalk.green);
        const mapEntities = this.deserialize<MapEntityMetadata>("map-entity", "MapEntity");
        this.mapEntities.load(mapEntities);
        Logger.log("Map Entities Metadata Loaded", chalk.green);

        Logger.log("Loading Maps Metadata", chalk.green);
        const maps = this.deserialize<MapMetadata>("map", "Map");
        this.maps.load(maps);
        Logger.log("Map Metadata Loaded", chalk.green);

        Logger.log("Loading Skill Metadata", chalk.green);
        const skills = this.deserialize<SkillMetadata>("skill", "Skill");
        this.skills.load(skills);
        Logger.log("Skill Metadata loaded", chalk.green);
    }

    private static deserialize<T>(slug: string, name: string): T[] {
        const root = protobuf.loadSync(`${process.cwd()}/resources/proto/${slug}.proto`);
        const buffer = fs.readFileSync(`${process.cwd()}/resources/metadata/ms2-${slug}-metadata`);

        const type = root.lookupType(`List${name}Metadata`);
        return type.decode(buffer).toJSON().items;
    }
}
