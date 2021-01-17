import * as net from "net";
import { HexColor } from "../../tools/HexColor";
import { Logger } from "../../tools/Logger";
import { LoginPacketRouter } from "../routers/LoginPacketRouter";
import { LoginSession } from "../sessions/LoginSession";
import { Session } from "../sessions/Session";
import { Server } from "./Server";

export class LoginServer extends Server {

    public constructor(host: string, port: number) {
        super(host, port, new LoginPacketRouter());
        super.start();
    }

    protected onConnection(socket: net.Socket): void {
        const session = new LoginSession(this.sessionCounter++, socket, this.packetRouter);

        Logger.log(`LoginServer: Session ${session.id} @ ${session.socket.remoteAddress} opened`);

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
        Logger.log(`LoginServer: Session ${session.id} @ ${session.socket.remoteAddress} closed`);
    }

    protected onError(session: Session, error: Error): void {
        Logger.log(error.message, HexColor.RED);
    }

    protected onStart(): void {
        Logger.log(`LoginServer started at ${this.host}:${this.port}`);
    }

    protected onShutdown(): void {
        Logger.log(`LoginServer at ${this.host}:${this.port} shutdown`);
    }
}
