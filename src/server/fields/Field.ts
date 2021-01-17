import { Packet } from "../../crypto/protocol/Packet";
import { ChannelSession } from "../../network/sessions/ChannelSession";
import { FieldAddUserPacket } from "../../packets/FieldAddUserPacket";
import { ProxyGameObjectPacket } from "../../packets/ProxyGameObjectPacket";
import { Logger } from "../../tools/Logger";
import { FieldState } from "./FieldState";

export class Field {

    public id: number;
    public state: FieldState = new FieldState();

    private counter: number = 100000;
    private sessions = new Array<ChannelSession>();

    public constructor(id: number) {
        this.id = id;
        setInterval(() => {
            this.sendUpdates();
        }, 1000)
    }

    private getUpdates(): Array<Packet> {
        const updates = new Array<Packet>();

        for (const player of this.state.getPlayers()) {
            updates.push(ProxyGameObjectPacket.updatePlayer(player));
        }

        return updates;
    }

    private sendUpdates(): void {
        const packets = this.getUpdates();
        Logger.log("Map " + this.id + " sending " + packets.length + " packets to " + this.state.getPlayers().length + " players.");

        packets.forEach(packet => {
            this.sessions.forEach(session => {
                session.send(packet);
            })
        });
    }

    public broadcast(packet: Packet, sender: ChannelSession | null = null) {
        // TODO: improve this
        this.sessions.forEach(session => {
            if (sender && sender.id === session.id) {
                return;
            }
            session.send(packet);
        });
    }

    public async addPlayer(session: ChannelSession): Promise<void> {

        for (const existingPlayer of this.state.getPlayers()) {
            session.send(await FieldAddUserPacket.addPlayer(existingPlayer));
            session.send(ProxyGameObjectPacket.loadPlayer(existingPlayer));
        }

        this.state.addPlayer(session.player);
        this.sessions.push(session);

        this.broadcast(await FieldAddUserPacket.addPlayer(session.player))
        this.broadcast(ProxyGameObjectPacket.loadPlayer(session.player))
    }
}