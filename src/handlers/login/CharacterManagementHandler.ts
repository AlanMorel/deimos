import Configs from "../../configs.json";
import { PacketReader } from "../../crypto/protocol/PacketReader";
import { AccountStorage } from "../../data/storage/AccountStorage";
import { CharacterStorage } from "../../data/storage/CharacterStorage";
import { Endpoint } from "../../network/Endpoint";
import { Session } from "../../network/Session";
import { CharacterCreatePacket } from "../../packets/CharacterCreatePacket";
import { CharacterListPacket } from "../../packets/CharacterListPacket";
import { CharacterMaxCountPacket } from "../../packets/CharacterMaxCountPacket";
import { LoginToGamePacket } from "../../packets/LoginToGamePacket";
import { HexColor } from "../../tools/HexColor";
import { Logger } from "../../tools/Logger";
import { ItemColor } from "../../types/color/ItemColor";
import { SkinColor } from "../../types/color/SkinColor";
import { HairData } from "../../types/HairData";
import { Item } from "../../types/item/Item";
import { ItemSlot } from "../../types/item/ItemSlot";
import { Player } from "../../types/Player";
import { PacketHandler } from "../PacketHandler";

enum Mode {
    LOGIN = 0x0,
    CREATE = 0x1,
    DELETE = 0x2
}

export class CharacterManagementHandler implements PacketHandler {

    public handle(session: Session, packet: PacketReader): void {
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
        }
    }

    private handleLogin(session: Session, packet: PacketReader): void {
        const charId = packet.readLong();
        packet.readShort(); // 01 00

        Logger.log(`Logging in to game with char id: ${charId}`, HexColor.PURPLE);

        const endpoint = new Endpoint(Configs.channel.host, Configs.channel.port);

        const authData = {
            tokenA: Math.random(),
            tokenB: Math.random(),
            characterId: charId,
        };

        session.send(LoginToGamePacket.loginToGame(endpoint, authData));
    }

    private handleCreate(session: Session, packet: PacketReader): void {
        const gender = packet.readByte();
        const jobGroupId = packet.readShort();
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

            const item = new Item(id, itemSlot);
            item.color = itemColor;

            switch (itemSlot) {
                case ItemSlot.HR: {
                    item.hairData = HairData.read(packet);
                    break;
                }
                case ItemSlot.FD: {
                    item.faceDecorationData = packet.read(16);
                    break;
                }
            }

            equips.set(itemSlot, item);
        }

        packet.readInt(); // constant 4?

        const taken = false; // TODO: validate name is available

        if (taken) {
            session.send(CharacterCreatePacket.nameTaken());
            return;
        }

        const newCharacter = new Player(BigInt(2), gender, jobGroupId, name, skinColor, equips);

        CharacterStorage.storage.addCharacter(newCharacter);
        AccountStorage.storage.addCharacterID(newCharacter.accountId, newCharacter.characterId);

        session.send(CharacterMaxCountPacket.setMax(4, 6));
        session.send(CharacterListPacket.append(newCharacter));
    }
}
