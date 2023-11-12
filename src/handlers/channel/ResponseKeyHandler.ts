import { PacketReader } from "@/crypto/protocol/PacketReader";
import { AuthStorage } from "@/data/storage/AuthStorage";
import db from "@/database/Database";
import { ChannelPacketHandler } from "@/handlers/ChannelPacketHandler";
import { ResponseKeyHelper } from "@/handlers/helpers/ReponseKeyHelper";
import { ChannelSession } from "@/network/sessions/ChannelSession";
import { BuddyListPacket } from "@/packets/BuddyListPacket";
import { DynamicChannelPacket } from "@/packets/DynamicChannelPacket";
import { FieldEntrancePacket } from "@/packets/FieldEntrancePacket";
import { FishingPacket } from "@/packets/FishingPacket";
import { FurnishingInventoryPacket } from "@/packets/FurnishingInventoryPacket";
import { ItemInventoryPacket } from "@/packets/ItemInventoryPacket";
import { KeyTablePacket } from "@/packets/KeyTablePacket";
import { LoginRequiredPacket } from "@/packets/LoginRequiredPacket";
import { MarketInventoryPacket } from "@/packets/MarketInventoryPacket";
import { PrestigePacket } from "@/packets/PrestigePacket";
import { RequestClientTickSyncPacket } from "@/packets/RequestClientTickSyncPacket";
import { RequestFieldEnterPacket } from "@/packets/RequestFieldEnterPacket";
import { ResponseTimeSyncPacket } from "@/packets/ResponseTimeSyncPacket";
import { ServerEnterPacket } from "@/packets/ServerEnterPacket";
import { SyncNumberPacket } from "@/packets/SyncNumberPacket";
import { UserEnvPacket } from "@/packets/UserEnvPacket";
import { Logger } from "@/tools/Logger";
import { Time } from "@/tools/Time";
import { InventoryTab } from "@/types/inventory/InventoryTab";
import { Player } from "@/types/player/Player";

export class ResponseKeyHandler implements ChannelPacketHandler {
    public async handle(session: ChannelSession, packet: PacketReader): Promise<void> {
        const accountId = packet.readLong();
        const authData = AuthStorage.getData(accountId);

        if (!authData) {
            Logger.error("Attempted connection to channel server with unauthorized auth data.");
            return;
        }

        // backwards seeking because we read accountId here
        packet.skip(-8);

        ResponseKeyHelper.handle(session, packet);

        const player = await db.getCharacters().getByCharacterId(authData.characterId);
        if (!player) {
            return;
        }

        player.equips = Player.getTestEquips();

        session.initialize(player);

        session.send(LoginRequiredPacket.loginRequired(accountId));

        session.send(BuddyListPacket.startList());
        session.send(BuddyListPacket.endList());

        session.send(ResponseTimeSyncPacket.setInitial1());
        session.send(ResponseTimeSyncPacket.setInitial2());
        session.send(ResponseTimeSyncPacket.request());

        session.serverTick = Time.getTickCount();

        session.send(RequestClientTickSyncPacket.tickSync());
        session.send(DynamicChannelPacket.dynamicChannel());
        session.send(ServerEnterPacket.enter(session));
        session.send(SyncNumberPacket.sync());

        session.send(PrestigePacket.prestige(player));

        for (const tab of Object.values(InventoryTab)) {
            if (typeof tab === "string") {
                continue;
            }
            session.send(ItemInventoryPacket.resetTab(tab));
            session.send(ItemInventoryPacket.loadTab(tab));
        }

        session.send(MarketInventoryPacket.count(0));
        session.send(MarketInventoryPacket.startList());
        session.send(MarketInventoryPacket.endList());

        session.send(FurnishingInventoryPacket.startList());
        session.send(FurnishingInventoryPacket.endList());

        const titles = [10000565, 10000251, 10000291, 10000292];

        session.send(UserEnvPacket.setTitles(titles));
        session.send(UserEnvPacket.send04());
        session.send(UserEnvPacket.send05());
        session.send(UserEnvPacket.send08());
        session.send(UserEnvPacket.send09());
        session.send(UserEnvPacket.send10());
        session.send(UserEnvPacket.send12());

        session.send(FishingPacket.loadLog());

        session.send(KeyTablePacket.requestDefault());

        session.send(FieldEntrancePacket.enter());

        session.send(RequestFieldEnterPacket.requestEnter(player));
    }
}
