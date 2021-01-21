import { Packet } from "../crypto/protocol/Packet";
import { Player } from "../types/player/Player";

export class World {

    private static instance: World = new World();

    private idStorage: Map<BigInt, Player> = new Map<BigInt, Player>();
    private nameStorage: Map<string, Player> = new Map<string, Player>();

    public static getInstance(): World {
        return World.instance;
    }

    public addPlayer(player: Player): void {
        this.idStorage.set(player.characterId, player);
        this.nameStorage.set(player.name.toLowerCase(), player);
    }

    public removePlayer(player: Player): void {
        this.idStorage.delete(player.characterId);
        this.nameStorage.delete(player.name.toLowerCase());
    }

    public broadcast(packet: Packet): void {
        this.getPlayers().forEach(player => {
            player.session?.send(packet);
        });
    }

    public getPlayers(): Player[] {
        return Array.from(this.idStorage.values());
    }

    public getPlayerByName(name: string): Player | undefined {
        return this.nameStorage.get(name.toLowerCase());
    }

    public getPlayerById(id: BigInt): Player | undefined {
        return this.idStorage.get(id);
    }
}
