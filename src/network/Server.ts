import * as net from 'net';
import { PacketReader } from '../tools/PacketReader';
import { Session } from './Session';

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
        this.server.on('connection', (socket) => {
            const session = new Session(0, socket);
            this.onConnection(this.setupConnection(session));
        });
        this.server.listen(this.port, this.host);
        return true;
    }

    setupConnection(session: Session): Session {
        session.socket.on('data', (data) => this.onData(session, data));
        return session;
    }

    onConnection(session: Session): void {
        console.log(`Server received a client connection: session ${session.id} @ ${session.socket.remoteAddress}`);
        session.sendHandshake(0);
    }

    onData(session: Session, data: Buffer): void {

        session.bufferStream.write(data);

        let buffer = session.bufferStream.tryRead();
        while (buffer !== null) {
            let packet = session.recvCipher.transform(buffer);
            let reader = new PacketReader(packet.buffer);

            console.log("[RECV]: " + packet.toString());

            let opcode = reader.readShort();
            // TODO: handle incoming packet

            buffer = session.bufferStream.tryRead();
        }
    }
}