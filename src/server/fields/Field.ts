import { Packet } from "../../crypto/protocol/Packet";
import { ChannelSession } from "../../network/sessions/ChannelSession";
import { FieldAddUserPacket } from "../../packets/FieldAddUserPacket";
import { ProxyGameObjectPacket } from "../../packets/ProxyGameObjectPacket";
import { FieldState } from "./FieldState";

export class Field {

    private static UPDATE_INTERVAL = 1000;

    public id: number;
    public state: FieldState = new FieldState();

    private counter: number = 100000;
    private sessions = new Array<ChannelSession>();

    public constructor(id: number) {
        this.id = id;
        setInterval(() => {
            this.sendUpdates();
        }, Field.UPDATE_INTERVAL);
    }

    private getUpdates(): Packet[] {
        const updates = new Array<Packet>();

        for (const player of this.state.getPlayers()) {
            updates.push(ProxyGameObjectPacket.updatePlayer(player));
        }

        return updates;
    }

    private sendUpdates(): void {
        const packets = this.getUpdates();
        // Logger.log("Map " + this.id + " sending " + packets.length + " packets to " + this.state.getPlayers().length + " players.");

        packets.forEach(packet => {
            this.sessions.forEach(session => {
                session.send(packet);
            });
        });
    }

    public broadcast(packet: Packet, sender: ChannelSession | null = null): void {
        this.sessions.filter(session => !sender || sender.id !== session.id).forEach(session => {
            session.send(packet);
        });
    }

    public addPlayer(session: ChannelSession): void {

        for (const existingPlayer of this.state.getPlayers()) {
            session.send(FieldAddUserPacket.addPlayer(existingPlayer));
            session.send(ProxyGameObjectPacket.loadPlayer(existingPlayer));
        }

        session.player.objectId = this.counter++;

        this.state.addPlayer(session.player);
        this.sessions.push(session);

        this.broadcast(FieldAddUserPacket.addPlayer(session.player));
        this.broadcast(ProxyGameObjectPacket.loadPlayer(session.player));
    }
}
