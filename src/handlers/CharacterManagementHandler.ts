import { PacketReader } from "../crypto/protocol/PacketReader";
import { Endpoint } from "../interfaces/Endpoint";
import { Session } from "../network/Session";
import { LoginToGamePacket } from "../packets/LoginToGamePacket";
import { HexColor } from "../tools/HexColor";
import { Logger } from "../tools/Logger";
import { EquipColor } from "../types/EquipColor";
import { ItemSlot } from "../types/ItemSlot";
import { SkinColor } from "../types/SkinColor";
import { PacketHandler } from "./PacketHandler";

export class CharacterManagementHandler implements PacketHandler {

    public handle(session: Session, packet: PacketReader): void {
        const mode = packet.readByte();

        switch (mode) {
            case 0x0: // login
                this.handleLogin(session, packet);
                break;
            case 0x1: // create
                this.handleCreate(session, packet);
                break;
            case 0x2: // delete
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
        const jobCode = packet.readShort();
        const name = packet.readUnicodeString();
        const skinColor = SkinColor.read(packet);

        packet.readShort(); // const?

        Logger.log(`Creating character: ${name}, gender: ${gender}, skinColor: ${skinColor}, job: ${jobCode}`, HexColor.PURPLE);

        const equipCount = packet.readByte();
        for (let i = 0; i < equipCount; i++) {
            const id = packet.readUInt();
            const type = packet.readUnicodeString();
            const equipColor = EquipColor.read(packet);
            const colorIndex = packet.readInt();

            Logger.log(`${type} - id: ${id}, color: ${equipColor}, colorIndex: ${colorIndex}`, HexColor.PURPLE);

            switch (type) {
                case ItemSlot[ItemSlot.HR]: // hair
                    const backLength = packet.readInt();
                    const backPositiionArray = packet.read(24);
                    const frontLength = packet.readInt();
                    const frontPositiionArray = packet.read(24);

                    break;
                case ItemSlot[ItemSlot.FA]: // face
                    break;
                case ItemSlot[ItemSlot.FD]: // face decoration
                    const faceDecoration = packet.read(16);
                    break;
                case ItemSlot[ItemSlot.CL]: // clothes
                case ItemSlot[ItemSlot.PA]: // pants
                case ItemSlot[ItemSlot.SH]: // shoes
                case ItemSlot[ItemSlot.ER]: // ear
                    break;

            }
        }
    }
}
