import chalk from "chalk";
import Configs from "../../Configs";
import { PacketReader } from "../../crypto/protocol/PacketReader";
import { AuthStorage } from "../../data/storage/AuthStorage";
import { Endpoint } from "../../network/Endpoint";
import { ChannelSession } from "../../network/sessions/ChannelSession";
import { GameToGamePacket } from "../../packets/GameToGamePacket";
import { TaxiPacket } from "../../packets/TaxiPacket";
import { Logger } from "../../tools/Logger";
import { ChannelPacketHandler } from "../ChannelPacketHandler";

enum RequestTaxiMode {
    CAR = 0x1,
    ROTORS_MESO = 0x3,
    ROTORS_MERET = 0x4,
    DISCOVER_TAXI = 0x5
}

export class RequestTaxiHandler implements ChannelPacketHandler {
    public handle(session: ChannelSession, packet: PacketReader): void {
        const mode = packet.readByte() as RequestTaxiMode;
        let mapId: number = 0;
        const _meretPrice: number = 15;

        if (mode !== RequestTaxiMode.DISCOVER_TAXI) {
            mapId = packet.readInt();
        }

        switch (mode) {
            case RequestTaxiMode.CAR:
            case RequestTaxiMode.ROTORS_MERET:
            case RequestTaxiMode.ROTORS_MESO:
                Logger.log("Unimplemented Taxi Mode Requested", chalk.grey);
                break;
            case RequestTaxiMode.DISCOVER_TAXI:
                mapId = session.player.mapId;
                session.send(TaxiPacket.discoverTaxi(mapId));
                break;
        }
    }
}
