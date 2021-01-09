import * as net from "net";
import { Session } from "./Session";

export class Server {
    protected server: net.Server;
    protected host: string;
    protected port: number;

    constructor(host: string, port: number) {
        this.port = port;
        this.host = host;
        this.server = net.createServer();
        this.start();
    }

    async start(): Promise<boolean> {
        this.server.on("connection", (socket) => {
            const session = new Session(0, socket);
            this.onConnection(this.setupConnection(session));
        });
        this.server.listen(this.port, this.host);
        return true;
    }

    private setupConnection(session: Session): Session {
        session.socket.on("data", (data) => session.onData(data));
        return session;
    }

    private onConnection(session: Session): void {
        console.log(`Server received a client connection: session ${session.id} @ ${session.socket.remoteAddress}`);
        session.sendHandshake(0);
    }
}