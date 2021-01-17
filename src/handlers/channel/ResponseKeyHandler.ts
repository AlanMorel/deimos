import { PacketReader } from "../../crypto/protocol/PacketReader";
import { AuthStorage } from "../../data/storage/AuthStorage";
import { CharacterStorage } from "../../data/storage/CharacterStorage";
import { ChannelSession } from "../../network/sessions/ChannelSession";
import { BuddyListPacket } from "../../packets/BuddyListPacket";
import { DynamicChannelPacket } from "../../packets/DynamicChannelPacket";
import { FieldEntrancePacket } from "../../packets/FieldEntrancePacket";
import { FishingPacket } from "../../packets/FishingPacket";
import { FurnishingInventoryPacket } from "../../packets/FurnishingInventoryPacket";
import { ItemInventoryPacket } from "../../packets/ItemInventoryPacket";
import { KeyTablePacket } from "../../packets/KeyTablePacket";
import { LoginRequiredPacket } from "../../packets/LoginRequiredPacket";
import { MarketInventoryPacket } from "../../packets/MarketInventoryPacket";
import { MoveResultPacket } from "../../packets/MoveResultPacket";
import { PrestigePacket } from "../../packets/PrestigePacket";
import { RequestClientTickSyncPacket } from "../../packets/RequestClientTickSyncPacket";
import { RequestFieldEnterPacket } from "../../packets/RequestFieldEnterPacket";
import { ServerEnterPacket } from "../../packets/ServerEnterPacket";
import { SyncNumberPacket } from "../../packets/SyncNumberPacket";
import { UserEnvPacket } from "../../packets/UserEnvPacket";
import { Logger } from "../../tools/Logger";
import { InventoryTab } from "../../types/InventoryTab";
import { ChannelPacketHandler } from "../ChannelPacketHandler";

export class ResponseKeyHandler implements ChannelPacketHandler {

    public handle(session: ChannelSession, packet: PacketReader): void {
        const accountId = packet.readLong();
        const tokenA = packet.readInt();
        const tokenB = packet.readInt();

        const authData = AuthStorage.getData(accountId);

        if (!authData) {
            Logger.log("Attempted connection to game with unauthorized account.");
            return;

        }

        if (tokenA != authData.tokenA || tokenB != authData.tokenB) {
            Logger.log("Attempted login with invalid tokens.");
            return;
        }

        const player = CharacterStorage.storage.getCharacter(authData.characterId);

        if (!player) {
            return;
        }

        session.player = player;

        session.send(MoveResultPacket.moveResult());

        session.send(LoginRequiredPacket.loginRequired(accountId));

        session.send(BuddyListPacket.startList());
        session.send(BuddyListPacket.endList());

        session.send(RequestClientTickSyncPacket.tickSync());

        session.send(DynamicChannelPacket.dynamicChannel());

        session.send(ServerEnterPacket.enter(player));

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
