import { Socket } from "net";
import { Field } from "../../server/fields/Field";
import { World } from "../../server/World";
import { Player } from "../../types/player/Player";
import { PacketRouter } from "../routers/PacketRouter";
import { ChannelServer } from "../servers/ChannelServer";
import { Session } from "./Session";

export class ChannelSession extends Session {

    public player: Player = Player.getInitialPlayer();
    public channel: ChannelServer;
    public field?: Field;
    public serverTick = 0;
    public clientTick = 0;

    public constructor(channel: ChannelServer, id: number, router: PacketRouter, socket: Socket) {
        super(id, socket, router);
        this.channel = channel;
    }

    public initialize(player: Player): void {
        this.player = player;
        this.player.session = this;
        this.field = this.channel.fieldFactory.getField(player.mapId);
        World.getInstance().addPlayer(player);
    }
}
