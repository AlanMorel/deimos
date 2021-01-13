import * as net from "net";
import { HexColor } from "../../tools/HexColor";
import { Logger } from "../../tools/Logger";
import { LoginPacketRouter } from "../routers/LoginPacketRouter";
import { Session } from "../Session";
import { Server } from "./Server";

export class LoginServer extends Server {

    public constructor(host: string, port: number) {
        super("Login", host, port, new LoginPacketRouter());
    }

    protected onConnection(socket: net.Socket): void {
        const session = new Session(this.sessionCounter++, socket, this.packetRouter);

        Logger.log(`Session ${session.id} @ ${session.socket.remoteAddress} opened`);

        this.setupSocketEvents(session);
    }

    private setupSocketEvents(session: Session): void {
        session.socket.setNoDelay(true);
        session.socket.on("data", data => this.onData(session, data));
        session.socket.on("close", hadError => this.onClose(session, hadError));
        session.socket.on("error", error => this.onError(session, error));
    }

    protected onData(session: Session, data: Buffer): void {
        session.onData(data);
    }

    protected onClose(session: Session, hadError: boolean): void {
        Logger.log(`Session ${session.id} @ ${session.socket.remoteAddress} closed`);
    }

    protected onError(session: Session, error: Error): void {
        Logger.log(error.message, HexColor.RED);
    }

    protected onStart(): void {
        // TODO: implement
    }

    protected onShutdown(): void {
        // TODO: implement
    }
}
