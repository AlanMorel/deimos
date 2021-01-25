import { Packet } from "../../crypto/protocol/Packet";
import { ChannelSession } from "../../network/sessions/ChannelSession";
import { FieldAddUserPacket } from "../../packets/FieldAddUserPacket";
import { FieldPortalPacket } from "../../packets/FieldPortalPacket";
import { FieldRemoveUserPacket } from "../../packets/FieldRemoveUserPacket";
import { ProxyGameObjectPacket } from "../../packets/ProxyGameObjectPacket";
import { FieldState } from "./FieldState";

export class Field {

    private static readonly UPDATE_INTERVAL = 1000;

    public id: number;
    public state: FieldState;

    private counter: number = 100000;
    private sessions = new Array<ChannelSession>();
    private updater: NodeJS.Timeout;

    public constructor(id: number) {
        this.id = id;
        this.state = new FieldState(this, id);
        this.updater = setInterval(() => this.sendUpdates(), Field.UPDATE_INTERVAL);
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

        packets.forEach(packet => {
            this.sessions.forEach(session => {
                session.send(packet);
            });
        });
    }

    private pauseUpdates(): void {
        clearInterval(this.updater);
    }

    private resumeUpdates(): void {
        clearInterval(this.updater);
        this.updater = setInterval(() => this.sendUpdates(), Field.UPDATE_INTERVAL);
    }

    public getNewObjectId(): number {
        return this.counter++;
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

        for (const portal of this.state.getPortals()) {
            session.send(FieldPortalPacket.addPortal(portal));
        }

        session.player.objectId = this.getNewObjectId();

        this.state.addPlayer(session.player);
        this.sessions.push(session);

        this.broadcast(FieldAddUserPacket.addPlayer(session.player));
        this.broadcast(ProxyGameObjectPacket.loadPlayer(session.player));

        if (this.sessions.length === 1) {
            this.resumeUpdates();
        }
    }

    public removePlayer(session: ChannelSession): void {
        this.state.removePlayer(session.player.objectId);
        this.broadcast(FieldRemoveUserPacket.removePlayer(session.player));

        const index = this.sessions.findIndex(s => s.id = session.id);
        this.sessions.splice(index, 1);

        session.player.objectId = 0;

        if (this.sessions.length < 1) {
            this.pauseUpdates();
        }
    }
}
