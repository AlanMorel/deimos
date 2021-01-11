import * as net from "net";
import { HexColor } from "../tools/HexColor";
import { Logger } from "../tools/Logger";
import { LoginPacketRouter } from "./LoginPacketRouter";
import { PacketRouter } from "./PacketRouter";
import { Session } from "./Session";

export class Server {

    protected server: net.Server;
    protected host: string;
    protected port: number;
    protected packetRouter: PacketRouter;

    public constructor(host: string, port: number) {
        this.server = net.createServer();
        this.host = host;
        this.port = port;
        this.packetRouter = new LoginPacketRouter();

        this.start();
    }

    public async start(): Promise<boolean> {
        this.server.on("connection", socket => {
            this.onConnection(socket);
        });
        this.server.listen(this.port, this.host);
        return true;
    }

    private onConnection(socket: net.Socket): void {
        const session = new Session(0, socket, this.packetRouter);

        console.log(`Server received a client connection: session ${session.id} @ ${session.socket.remoteAddress}`);

        this.setupSocketEvents(session);
    }

    private setupSocketEvents(session: Session): void {
        session.socket.setNoDelay(true);
        session.socket.on("data", data => this.onData(session, data));
        session.socket.on("close", hadError => this.onClose(session, hadError));
        session.socket.on("error", error => this.onError(session, error));
    }

    public onData(session: Session, data: Buffer): void {
        session.onData(data);
    }

    public onClose(session: Session, hadError: boolean): void {
        Logger.log(`Session ${session.id} @ ${session.socket.remoteAddress} closed`, HexColor.RED);
    }

    public onError(session: Session, error: Error): void {
        Logger.log(error.message, HexColor.RED);
    }
}
