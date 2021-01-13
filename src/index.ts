import Configs from "./configs.json";
import { ChannelServer } from "./network/servers/ChannelServer";
import { LoginServer } from "./network/servers/LoginServer";
import { HexColor } from "./tools/HexColor";
import { Logger } from "./tools/Logger";

Logger.log("Deimos has started", HexColor.YELLOW);

new LoginServer(Configs.login.host, Configs.login.port);
new ChannelServer(1, Configs.channel.host, Configs.channel.port);
