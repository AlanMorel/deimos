import Configs from "./Configs";
import { Metadata } from "./data/metadata/Metadata";
import { Database } from "./database/Database";
import { ChannelServer } from "./network/servers/ChannelServer";
import { LoginServer } from "./network/servers/LoginServer";
import { HexColor } from "./tools/HexColor";
import { Logger } from "./tools/Logger";

Logger.log("Deimos has started", HexColor.YELLOW);

if (Configs.settings.loadMetadata) {
    Metadata.load();
}

Database.connect().then(async () => {
    Logger.log("Database connection successful", HexColor.PURPLE);
});

new LoginServer(Configs.login.host, Configs.login.port);

for (const world of Configs.worlds) {
    for (const [id, channel] of world.channels.entries()) {
        new ChannelServer(world.name, id + 1, channel.host, channel.port);
    }
}
