import { PacketReader } from "../crypto/protocol/PacketReader";
import { Endpoint } from "../interfaces/Endpoint";
import { Session } from "../network/Session";
import { CharacterCreatePacket } from "../packets/CharacterCreatePacket";
import { CharacterListPacket } from "../packets/CharacterListPacket";
import { CharacterMaxCountPacket } from "../packets/CharacterMaxCountPacket";
import { LoginToGamePacket } from "../packets/LoginToGamePacket";
import { HexColor } from "../tools/HexColor";
import { Logger } from "../tools/Logger";
import { ItemColor } from "../types/color/ItemColor";
import { SkinColor } from "../types/color/SkinColor";
import { HairData } from "../types/HairData";
import { Item } from "../types/item/Item";
import { ItemSlot } from "../types/item/ItemSlot";
import { ItemStats } from "../types/item/ItemStats";
import { Player } from "../types/Player";
import { PacketHandler } from "./PacketHandler";

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

        const endpoint = new Endpoint("127.0.0.1", 20001);

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
            const type = packet.readUnicodeString();
            const equipColor = ItemColor.read(packet);
            const colorIndex = packet.readInt();

            switch (type) {
                case ItemSlot[ItemSlot.HR]: { // hair

                    const backLength = packet.readInt();
                    const backPositionArray = packet.read(24);
                    const frontLength = packet.readInt();
                    const frontPositionArray = packet.read(24);

                    const item = new Item(id, ItemSlot.HR);
                    item.color = equipColor;
                    item.hairData = new HairData(backLength, frontLength, backPositionArray, frontPositionArray);
                    item.stats = new ItemStats();

                    equips.set(ItemSlot.HR, item);
                    break;
                }
                case ItemSlot[ItemSlot.FA]: { // face
                    const item = new Item(id, ItemSlot.FA);
                    item.color = equipColor;
                    item.stats = new ItemStats();

                    equips.set(ItemSlot.FA, item);
                    break;
                }
                case ItemSlot[ItemSlot.FD]: { // face decoration
                    const faceDecoration = packet.read(16);

                    const item = new Item(id, ItemSlot.FD);
                    item.color = equipColor;
                    item.faceDecorationData = faceDecoration;
                    item.stats = new ItemStats();

                    equips.set(ItemSlot.FD, item);
                    break;
                }
                case ItemSlot[ItemSlot.CL]: { // clothes
                    const item = new Item(id, ItemSlot.CL);
                    item.color = equipColor;
                    item.stats = new ItemStats();

                    equips.set(ItemSlot.CL, item);
                    break;
                }
                case ItemSlot[ItemSlot.PA]: { // pants
                    const item = new Item(id, ItemSlot.PA);
                    item.color = equipColor;
                    item.stats = new ItemStats();

                    equips.set(ItemSlot.PA, item);
                    break;
                }
                case ItemSlot[ItemSlot.SH]: { // shoes
                    const item = new Item(id, ItemSlot.SH);
                    item.color = equipColor;
                    item.stats = new ItemStats();

                    equips.set(ItemSlot.SH, item);
                    break;
                }
                case ItemSlot[ItemSlot.ER]: { // ear
                    const item = new Item(id, ItemSlot.ER);
                    item.color = equipColor;
                    item.stats = new ItemStats();

                    equips.set(ItemSlot.ER, item);
                    break;
                }
            }
        }

        packet.readInt(); // constant 4?

        const taken = false; // TODO: validate name is available

        if (taken) {
            session.send(CharacterCreatePacket.nameTaken());
            return;
        }

        const newCharacter = new Player(gender, jobGroupId, name, skinColor, equips);

        session.send(CharacterMaxCountPacket.setMax(4, 6));

        session.send(CharacterListPacket.append(newCharacter));
    }
}
