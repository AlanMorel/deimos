import { PacketReader } from "../../crypto/protocol/PacketReader";
import { ChannelSession } from "../../network/sessions/ChannelSession";
import { EmotionPacket } from "../../packets/EmotionPacket";
import { KeyTablePacket } from "../../packets/KeyTablePacket";
import { StatPacket } from "../../packets/StatPacket";
import { StatPointPacket } from "../../packets/StatPointPacket";
import { Item } from "../../types/item/Item";
import { ChannelPacketHandler } from "../ChannelPacketHandler";

export class ResponseFieldEnterHandler implements ChannelPacketHandler {
    public handle(session: ChannelSession, packet: PacketReader): void {
        packet.readInt();

        session.field?.addPlayer(session);

        session.send(StatPacket.setStats(session.player));
        session.send(StatPointPacket.writeTotalStatPoints(session.player));
        session.send(EmotionPacket.loadEmotions());

        const item = new Item(40100001);
        item.amount = 1;

        const item2 = new Item(40100001);
        item2.amount = 1;

        const item3 = new Item(20302228);
        item3.amount = 1;

        session.player.inventory.addItem(session, item, true);
        session.player.inventory.addItem(session, item2, true);
        session.player.inventory.addItem(session, item3, true);

        const hotbar = session.player.gameOptions.getHotbarById(0);

        if (hotbar) {
            session.send(KeyTablePacket.sendHotbars(session.player.gameOptions));
        }
    }
}
