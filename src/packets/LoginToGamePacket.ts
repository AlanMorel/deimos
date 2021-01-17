import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { AuthData } from "../network/AuthData";
import { Endpoint } from "../network/Endpoint";

enum Mode {
    SUCCESS = 0x0
}

export class LoginToGamePacket {

    public static loginToGame(endpoint: Endpoint, authData: AuthData): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.LOGIN_TO_GAME);
        packet.writeByte(Mode.SUCCESS);
        packet.write(endpoint.getBytes());
        packet.writeUShort(endpoint.getPort());
        packet.writeInt(authData.tokenA);
        packet.writeInt(authData.tokenB); // some key
        packet.writeInt(62000000); // map id

        return packet;
    }
}
