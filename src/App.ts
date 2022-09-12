import Config from "@/Config";
import { Metadata } from "@/data/metadata/Metadata";
import { ChannelServer } from "@/network/servers/ChannelServer";
import { LoginServer } from "@/network/servers/LoginServer";
import { Logger } from "@/tools/Logger";
import picocolors from "picocolors";

const { magenta, yellow } = picocolors;

export class App {
    public constructor() {
        Logger.log(`${Config.name} has started`, yellow);

        this.loadMetadata();
        this.startLoginServer();
        this.startWorlds();
    }

    private loadMetadata(): void {
        if (Config.settings.loadMetadata) {
            Metadata.load();
            Logger.log("Metadata loaded successfully", magenta);
        } else {
            Logger.error("Metadata loading disabled");
        }
    }

    private startLoginServer(): void {
        new LoginServer(Config.login.host, Config.login.port);
    }

    private startWorlds(): void {
        for (const world of Config.worlds) {
            for (const [id, channel] of world.channels.entries()) {
                new ChannelServer(world.name, id + 1, channel.host, channel.port);
            }
        }
    }
}
