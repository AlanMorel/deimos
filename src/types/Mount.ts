import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { UgcPacketHelper } from "../packets/helpers/UgcPacketHelper";
import { RideType } from "./RideType";

export class Mount {

    public type: RideType;
    public id: number;
    public uid: BigInt;

    public constructor(type: RideType, id: number, uid: BigInt) {
        this.type = type;
        this.id = id;
        this.uid = uid;
    }

    public static write(packet: PacketWriter, mount: Mount): void {
        packet.writeByte(mount.type);
        packet.writeInt(mount.id);
        packet.writeInt(0); // TODO: mount ObjectId

        switch (mount.type) {
            case RideType.UseItem:
                packet.writeInt(mount.id);
                packet.writeBigInt(mount.uid);
                UgcPacketHelper.writeUgc(packet); // for template mounts
                break;
            case RideType.AdditionalEffect:
                packet.writeInt();
                packet.writeShort();
                break;
        }
    }
}
