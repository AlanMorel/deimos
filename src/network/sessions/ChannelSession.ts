import { Socket } from "net";
import { Player } from "../../types/player/Player";
import { PacketRouter } from "../routers/PacketRouter";
import { Session } from "./Session";

export class ChannelSession extends Session {

    public player?: Player;
    public channelId: number;

    public constructor(id: number, socket: Socket, packetRouter: PacketRouter, channelId: number) {
        super(id, socket, packetRouter);
        this.channelId = channelId;
    }
}
