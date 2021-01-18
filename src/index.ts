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
new ChannelServer(1, Configs.channel[0].host, Configs.channel[0].port);
