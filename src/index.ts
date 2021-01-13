import Configs from "./configs.json";
import { LoginServer } from "./network/servers/LoginServer";
import { HexColor } from "./tools/HexColor";
import { Logger } from "./tools/Logger";

Logger.log("Deimos has started", HexColor.YELLOW);

new LoginServer(Configs.loginServer.host, Configs.loginServer.port);
