import { Hotbar } from "./HotBar";
import { KeyBind } from "./KeyBind";

export class GameOptions {

    public keyBinds: Map<number, KeyBind>;
    public hotbars: Array<Hotbar>;
    public activeHotbarId: number = 0;

    public constructor() {
        this.keyBinds = new Map<number, KeyBind>();
        this.hotbars = new Array<Hotbar>();

        // Have 3 hotbars available
        for (let hotbar = 0; hotbar < 3; hotbar++) {
            this.hotbars.push(new Hotbar());
        }
    }

    public setKeyBind(keyBind: KeyBind): void {
        this.keyBinds.set(keyBind.keyCode, keyBind);
    }

    // Hotbar related
    public setActiveHotbar(hotbarId: number): void {
        this.activeHotbarId = hotbarId;
    }

    public getHotbarById(hotbarId: number): Hotbar | null {
        if (hotbarId < this.hotbars.length) {
            return this.hotbars[hotbarId];
        }
        return null;
    }
}
