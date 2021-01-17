import { Socket } from "net";
import { Player } from "../../types/Player";
import { PacketRouter } from "../routers/PacketRouter";
import { Session } from "./Session";

export class ChannelSession extends Session {

    public player?: Player;

    public constructor(id: number, socket: Socket, packetRouter: PacketRouter) {
        super(id, socket, packetRouter);
    }
}
