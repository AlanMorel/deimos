import { Server } from "./network/Server";
import { HexColor } from "./tools/HexColor";
import { Logger } from "./tools/Logger";

const host = "0.0.0.0";
const port = 20001;

Logger.log("Deimos has started", HexColor.YELLOW);

new Server(host, port);
