import { Session } from "../network/Session";
import { BannerListPacket } from "../packets/BannerListPacket";
import { NpsInfoPacket } from "../packets/NpsInfoPacket";
import { ServerListPacket } from "../packets/ServerListPacket";
import { PacketReader } from "../tools/PacketReader";
import { PacketHandler } from "./PacketHandler";

export interface ServerIP {
    address: string,
    port: number
}

export class ResponseLoginHandler implements PacketHandler {

    private serverName: string;
    private serverIPs: ServerIP[];

    public constructor() {
        this.serverName = "Paperwood";
        this.serverIPs = [
            {
                address: "127.0.0.1",
                port: 20001
            }
        ];
    }

    public handle(packet: PacketReader, session: Session): void {
        const mode = packet.readByte();
        console.log("ResponseLoginHandler Mode: " + mode);
        switch (mode) {
            case 0x1:
                session.send(NpsInfoPacket.npsInfo());
                session.send(BannerListPacket.setBanner(0)); // TODO: load banners
                session.send(ServerListPacket.setServers(this.serverName, this.serverIPs));
                break;
        }
    }
}
