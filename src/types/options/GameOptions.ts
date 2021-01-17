import { Hotbar } from "./HotBar";
import { KeyBind } from "./KeyBind";

export class GameOptions {

    private static HOTBARS_AVAILABLE = 3;

    public keyBinds: Map<number, KeyBind> = new Map<number, KeyBind>();
    public hotbars: Array<Hotbar> = new Array<Hotbar>();
    public activeHotbarId: number = 0;

    public constructor() {
        for (let hotbar = 0; hotbar < GameOptions.HOTBARS_AVAILABLE; hotbar++) {
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
