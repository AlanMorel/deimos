import { SendOp } from "@/constants/SendOp";
import { Packet } from "@/crypto/protocol/Packet";
import { PacketWriter } from "@/crypto/protocol/PacketWriter";
import { AuthData } from "@/network/AuthData";
import { Endpoint } from "@/network/Endpoint";

enum Mode {
    SUCCESS = 0x0
}

export class GameToLoginPacket {
    public static gameToLogin(endpoint: Endpoint, authData: AuthData): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.GAME_TO_LOGIN);
        packet.writeByte(Mode.SUCCESS);
        packet.write(endpoint.getBytes());
        packet.writeUShort(endpoint.getPort());
        packet.writeInt(authData.tokenA);
        packet.writeInt(authData.tokenB);

        return packet;
    }
}
