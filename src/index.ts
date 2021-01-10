import { Server } from "./network/Server";
import { Logger } from "./tools/Logger";
import { LoggerColor } from "./tools/LoggerColor";

const host = "0.0.0.0";
const port = 20001;

Logger.log("Deimos has started", LoggerColor.YELLOW);

new Server(host, port);
