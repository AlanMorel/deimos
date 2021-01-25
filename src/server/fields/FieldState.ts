import { MapPortalFlag } from "../../data/metadata/maps/portals/MapPortalFlag";
import { Metadata } from "../../data/metadata/Metadata";
import { Player } from "../../types/player/Player";
import { Field } from "./Field";
import { Portal } from "./Portal";

export class FieldState {

    private players: Map<number, Player> = new Map<number, Player>();
    private portals: Map<number, Portal> = new Map<number, Portal>();

    public constructor(field: Field, id: number) {
        const mapMetadata = Metadata.getMaps().getMap(id);

        if (!mapMetadata) {
            return;
        }

        mapMetadata.portals.forEach(portal => {
            const id = portal.id;
            const isVisible = (portal.flags & MapPortalFlag.Visible) != 0;
            const isEnabled = (portal.flags & MapPortalFlag.Enabled) != 0;
            const isMiniMapVisible = (portal.flags & MapPortalFlag.MinimapVisible) != 0;
            const rotation = portal.rotation;
            const targetMapId = portal.target;

            const newPortal = new Portal(id, isVisible, isEnabled, isMiniMapVisible, rotation, targetMapId);
            newPortal.objectId = field.getNewObjectId();
            newPortal.coord = portal.coord;

            this.portals.set(id, newPortal);
        });
    }

    public getPlayers(): Player[] {
        return Array.from(this.players.values());
    }

    public getPortals(): Portal[] {
        return Array.from(this.portals.values());
    }

    public addPlayer(player: Player): void {
        this.players.set(player.objectId, player);
    }

    public removePlayer(objectId: number): boolean {
        return this.players.delete(objectId);
    }
}
