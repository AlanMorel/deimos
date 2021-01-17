import * as net from "net";
import { FieldFactory } from "../../server/fields/FIeldFactory";
import { HexColor } from "../../tools/HexColor";
import { Logger } from "../../tools/Logger";
import { ChannelPacketRouter } from "../routers/ChannelPacketRouter";
import { ChannelSession } from "../sessions/ChannelSession";
import { Session } from "../sessions/Session";
import { Server } from "./Server";

export class ChannelServer extends Server {

    public id: number;
    public fieldFactory: FieldFactory = new FieldFactory();

    public constructor(id: number, host: string, port: number) {
        super(host, port, new ChannelPacketRouter());
        this.id = id;
        super.start();
    }

    protected onConnection(socket: net.Socket): void {
        const session = new ChannelSession(this, this.sessionCounter++, this.packetRouter, socket);

        Logger.log(`ChannelServer (${this.id}): Session ${session.id} @ ${session.socket.remoteAddress} opened`);

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
        Logger.log(`ChannelServer (${this.id}): Session ${session.id} @ ${session.socket.remoteAddress} closed`);
    }

    protected onError(session: Session, error: Error): void {
        Logger.log(error.message, HexColor.RED);
    }

    protected onStart(): void {
        Logger.log(`ChannelServer ${this.id} started at ${this.host}:${this.port}`);
    }

    protected onShutdown(): void {
        Logger.log(`ChannelServer ${this.id} at ${this.host}:${this.port} shutdown`);
    }
}
