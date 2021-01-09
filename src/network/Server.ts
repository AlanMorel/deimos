import * as net from "net";
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
            const session = new Session(0, socket, this.packetRouter);

            console.log(`Server received a client connection: session ${session.id} @ ${session.socket.remoteAddress}`);

            this.setupConnection(session);
        });
        this.server.listen(this.port, this.host);
        return true;
    }

    private setupConnection(session: Session): void {
        session.socket.on("data", data => session.onData(data));
    }
}