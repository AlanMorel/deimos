import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { RideType } from "./RideType";

export class Mount {

    public type: RideType;
    public id: BigInt;
    public uid: BigInt;

    public constructor(type: RideType, id: BigInt, uid: BigInt) {
        this.type = type;
        this.id = id;
        this.uid = uid;
    }

    public static write(packet: PacketWriter, mount: Mount): void {
        packet.writeByte(mount.type);
        packet.writeInt(0); // TODO: mount id
        packet.writeInt(0); // TODO: mount ObjectId

        switch (mount.type) {
            case RideType.UseItem:
                // TODO handle
                break;
            case RideType.AdditionalEffect:
                // TODO handle
                break;
        }
    }
}
