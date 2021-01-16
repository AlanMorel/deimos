import { PacketReader } from "../../crypto/protocol/PacketReader";
import { CharacterStorage } from "../../data/storage/CharacterStorage";
import { ChannelSession } from "../../network/sessions/ChannelSession";
import { EmotionPacket } from "../../packets/EmotionPacket";
import { FieldAddUserPacket } from "../../packets/FieldAddUserPacket";
import { KeyTablePacket } from "../../packets/KeyTablePacket";
import { ProxyGameObjectPacket } from "../../packets/ProxyGameObjectPacket";
import { StatPacket } from "../../packets/StatPacket";
import { StatPointPacket } from "../../packets/StatPointPacket";
import { ChannelPacketHandler } from "../ChannelPacketHandler";

export class ResponseFieldEnterHandler implements ChannelPacketHandler {

    public async handle(session: ChannelSession, packet: PacketReader): Promise<void> {
        packet.readInt();

        const characterId = BigInt(1);
        const player = CharacterStorage.storage.getCharacter(characterId);

        if (!player) {
            return;
        }

        session.send(await FieldAddUserPacket.addPlayer(player));
        session.send(ProxyGameObjectPacket.loadPlayer(player));

        session.send(StatPacket.setStats(player));
        session.send(StatPointPacket.writeTotalStatPoints(player));
        session.send(EmotionPacket.loadEmotions());
        session.send(KeyTablePacket.sendHotbars());
    }
}
