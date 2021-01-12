import Configs from "./configs.json";
import { Server } from "./network/Server";
import { HexColor } from "./tools/HexColor";
import { Logger } from "./tools/Logger";

Logger.log("Deimos has started", HexColor.YELLOW);

new Server(Configs.loginServer.host, Configs.loginServer.port);
