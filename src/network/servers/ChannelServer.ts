import { Socket } from "net";
import { FieldFactory } from "../../server/fields/FIeldFactory";
import { HexColor } from "../../tools/HexColor";
import { Logger } from "../../tools/Logger";
import { ChannelPacketRouter } from "../routers/ChannelPacketRouter";
import { ChannelSession } from "../sessions/ChannelSession";
import { Server } from "./Server";

export class ChannelServer extends Server {

    public id: number;
    public fieldFactory: FieldFactory = new FieldFactory();

    public constructor(id: number, host: string, port: number) {
        super(host, port, new ChannelPacketRouter());
        this.id = id;
        super.start();
    }

    protected onConnection(socket: Socket): void {
        const session = new ChannelSession(this, this.sessionCounter++, this.packetRouter, socket);

        Logger.log(`Channel ${this.id}: Session ${session.id} @ ${session.socket.remoteAddress} opened`);

        this.setupSocketEvents(session);
    }

    private setupSocketEvents(session: ChannelSession): void {
        session.socket.setNoDelay(true);
        session.socket.on("data", data => this.onData(session, data));
        session.socket.on("close", hadError => this.onClose(session, hadError));
        session.socket.on("error", error => this.onError(session, error));
    }

    protected onData(session: ChannelSession, data: Buffer): void {
        session.onData(data);
    }

    protected onClose(session: ChannelSession, hadError: boolean): void {
        session.field?.removePlayer(session);
        Logger.log(`Channel ${this.id}: Session ${session.id} @ ${session.socket.remoteAddress} closed`);
    }

    protected onError(session: ChannelSession, error: Error): void {
        Logger.error(error.message);
    }

    protected onStart(): void {
        Logger.log(`Channel ${this.id} at ${this.host}:${this.port} is online`, HexColor.GREEN);
    }

    protected onShutdown(): void {
        Logger.log(`Channel ${this.id} at ${this.host}:${this.port} shutdown`);
    }
}
