import { MeretsPacket } from "../../packets/MeretPacket";
import { MesoPacket } from "../../packets/MesoPacket";
import { WalletPacket } from "../../packets/WalletPacket";
import { CurrencyType } from "./CurrencyType";
import { Player } from "./Player";

export class Currency {
    private player: Player;
    private type: CurrencyType;
    public amount: bigint;

    public constructor(player: Player, type: CurrencyType, amount: bigint) {
        this.player = player;
        this.type = type;
        this.amount = amount;
    }

    public modify(amount: bigint): boolean {
        if (this.amount + amount < 0n) {
            return false;
        }
        this.amount = this.amount + amount;
        this.updateWallet();
        return true;
    }

    public setAmount(amount: bigint): void {
        if (amount < 0n) {
            return;
        }
        this.amount = amount;
        this.updateWallet();
    }

    private updateWallet(): void {
        switch (this.type) {
            case CurrencyType.Meso:
                this.player.session?.send(MesoPacket.update(this.player.wallet));
                break;
            case CurrencyType.Meret:
            case CurrencyType.GameMeret:
            case CurrencyType.EventMeret:
                this.player.session?.send(MeretsPacket.update(this.player.wallet));
                break;
            case CurrencyType.ValorToken:
            case CurrencyType.Treva:
            case CurrencyType.Rue:
            case CurrencyType.HaviFruit:
                this.player.session?.send(WalletPacket.update(this.type, this.amount));
                break;
            case CurrencyType.MesoToken:
                break;
            default:
                break;
        }
    }
}
