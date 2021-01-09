import { Server } from "./network/Server";

const host = "0.0.0.0";
const port = 20001;

console.log("Running Deimos");

new Server(host, port);