import Configs from "../../Configs";
import { PacketReader } from "../../crypto/protocol/PacketReader";
import { AuthStorage } from "../../data/storage/AuthStorage";
import { Database } from "../../database/Database";
import { Endpoint } from "../../network/Endpoint";
import { LoginSession } from "../../network/sessions/LoginSession";
import { CharacterCreatePacket } from "../../packets/CharacterCreatePacket";
import { CharacterListPacket } from "../../packets/CharacterListPacket";
import { CharacterMaxCountPacket } from "../../packets/CharacterMaxCountPacket";
import { LoginToGamePacket } from "../../packets/LoginToGamePacket";
import { HexColor } from "../../tools/HexColor";
import { Logger } from "../../tools/Logger";
import { ItemColor } from "../../types/color/ItemColor";
import { SkinColor } from "../../types/color/SkinColor";
import { CoordF } from "../../types/coords/CoordF";
import { FaceDecoration } from "../../types/item/FaceDecoration";
import { Hair } from "../../types/item/Hair";
import { Item } from "../../types/item/Item";
import { ItemSlot } from "../../types/item/ItemSlot";
import { Player } from "../../types/player/Player";
import { LoginPacketHandler } from "../LoginPacketHandler";

enum Mode {
    LOGIN = 0x0,
    CREATE = 0x1,
    DELETE = 0x2
}

export class CharacterManagementHandler implements LoginPacketHandler {

    public handle(session: LoginSession, packet: PacketReader): void {
        const mode = packet.readByte();

        switch (mode) {
            case Mode.LOGIN:
                this.handleLogin(session, packet);
                break;
            case Mode.CREATE:
                this.handleCreate(session, packet);
                break;
            case Mode.DELETE:
                break;
            default:
                Logger.unknownMode(this, mode);
                break;
        }
    }

    private handleLogin(session: LoginSession, packet: PacketReader): void {
        const characterId = packet.readLong();
        packet.readShort(); // 01 00

        Logger.log(`Logging in to game with char id: ${characterId}`, HexColor.PURPLE);

        const channel = Configs.worlds[0].channels[0];
        const endpoint = new Endpoint(channel.host, channel.port);

        const authData = {
            tokenA: AuthStorage.generateToken(),
            tokenB: AuthStorage.generateToken(),
            characterId: characterId,
        };

        AuthStorage.setData(session.accountId, authData);

        session.send(LoginToGamePacket.loginToGame(endpoint, authData));
    }

    private handleCreate(session: LoginSession, packet: PacketReader): void {
        const gender = packet.readByte();
        const jobGroupId = packet.readShort() * 10;
        const name = packet.readUnicodeString();
        const skinColor = SkinColor.read(packet);

        packet.readShort(); // const?

        const equips = new Map<ItemSlot, Item>();

        const equipCount = packet.readByte();
        for (let i = 0; i < equipCount; i++) {
            const id = packet.readUInt();
            const itemSlotName = packet.readUnicodeString();
            const itemColor = ItemColor.read(packet);
            const colorIndex = packet.readInt();

            const itemSlot = ItemSlot[itemSlotName as keyof typeof ItemSlot];

            switch (itemSlot) {
                case ItemSlot.HR: {
                    const hair = Hair.read(packet, id);
                    hair.color = itemColor;
                    equips.set(itemSlot, hair);
                    break;
                }
                case ItemSlot.FD: {
                    const faceDecoration = FaceDecoration.read(packet, id);
                    faceDecoration.color = itemColor;
                    equips.set(itemSlot, faceDecoration);
                    break;
                }
                default: {
                    const item = new Item(id);
                    item.color = itemColor;
                    equips.set(itemSlot, item);
                }
            }
        }

        packet.readInt(); // constant 4?

        const taken = false; // TODO: validate name is available

        if (taken) {
            session.send(CharacterCreatePacket.nameTaken());
            return;
        }

        const newCharacter = new Player(BigInt(-1), gender, jobGroupId, name, skinColor, equips);

        newCharacter.mapId = 52000065;
        newCharacter.coord = new CoordF(-800, 600, 500);

        Database.getCharacters().insert(newCharacter);

        session.send(CharacterMaxCountPacket.setMax(4, 6));
        session.send(CharacterListPacket.append(newCharacter));
    }
}
