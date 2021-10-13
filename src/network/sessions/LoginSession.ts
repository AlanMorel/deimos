import { Socket } from "net";
import { PacketRouter } from "../routers/PacketRouter";
import { Session } from "./Session";

export class LoginSession extends Session {
    public accountId: BigInt = 0n;

    public constructor(id: number, socket: Socket, packetRouter: PacketRouter) {
        super(id, socket, packetRouter);
    }
}
