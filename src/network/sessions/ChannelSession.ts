import { Socket } from "net";
import { Field } from "../../server/fields/Field";
import { Player } from "../../types/player/Player";
import { PacketRouter } from "../routers/PacketRouter";
import { ChannelServer } from "../servers/ChannelServer";
import { Session } from "./Session";

export class ChannelSession extends Session {

    public player: Player = Player.getInitialPlayer();
    public channel: ChannelServer;
    public field?: Field;

    public constructor(channel: ChannelServer, id: number, router: PacketRouter, socket: Socket) {
        super(id, socket, router);
        this.channel = channel;
    }

    public initialize(player: Player) {
        this.player = player;
        this.field = this.channel.fieldFactory.getField(player.mapId);
    }
}
