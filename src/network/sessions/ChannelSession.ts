import { Socket } from "net";
import { PacketRouter } from "../routers/PacketRouter";
import { Session } from "./Session";

export class ChannelSession extends Session {

    public constructor(id: number, socket: Socket, packetRouter: PacketRouter) {
        super(id, socket, packetRouter);
    }
}
