import { PacketRouter } from "@/network/routers/PacketRouter";
import { Session } from "@/network/sessions/Session";
import { Socket } from "net";

export class LoginSession extends Session {
    public accountId: bigint = 0n;

    public constructor(id: number, socket: Socket, packetRouter: PacketRouter) {
        super(id, socket, packetRouter);
    }
}
