import Configs from "./Configs";
import { ChannelServer } from "./network/servers/ChannelServer";
import { LoginServer } from "./network/servers/LoginServer";
import { HexColor } from "./tools/HexColor";
import { Logger } from "./tools/Logger";

Logger.log("Deimos has started", HexColor.YELLOW);

if (Configs.debug) {
    Logger.debug("Debug mode is enabled");
}

new LoginServer(Configs.login.host, Configs.login.port);

for (const [id, channel] of Configs.channels.entries()) {
    new ChannelServer(id + 1, channel.host, channel.port);
}
