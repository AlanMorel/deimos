import { Player } from "../../types/player/Player";

export class FieldState {

    private players: Map<number, Player>;

    public constructor() {
        this.players = new Map<number, Player>();
    }

    public getPlayers(): Array<Player> {
        return Array.from(this.players.values());
    }

    public addPlayer(player: Player): void {
        this.players.set(player.objectId, player);
    }

    public removePlayer(objectId: number): boolean {
        return this.players.delete(objectId);
    }
}
