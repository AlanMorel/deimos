import { Currency } from "./Currency";
import { CurrencyType } from "./CurrencyType";
import { Player } from "./Player";

export class Wallet {
    public meso: Currency;
    public meret: Currency;
    public gameMeret: Currency;
    public eventMeret: Currency;
    public valorToken: Currency;
    public treva: Currency;
    public rue: Currency;
    public haviFruit: Currency;
    public mesoToken: Currency;

    public constructor(player: Player) {
        this.meso = new Currency(player, CurrencyType.Meso, 2000n);
        this.meret = new Currency(player, CurrencyType.Meret, 2000n);
        this.gameMeret = new Currency(player, CurrencyType.GameMeret, 2000n);
        this.eventMeret = new Currency(player, CurrencyType.EventMeret, 2000n);
        this.valorToken = new Currency(player, CurrencyType.ValorToken, 2000n);
        this.treva = new Currency(player, CurrencyType.Treva, 2000n);
        this.rue = new Currency(player, CurrencyType.Rue, 2000n);
        this.haviFruit = new Currency(player, CurrencyType.HaviFruit, 2000n);
        this.mesoToken = new Currency(player, CurrencyType.MesoToken, 2000n);
    }
}
