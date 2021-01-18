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
        this.meso = new Currency(player, CurrencyType.Meso, BigInt(2000));
        this.meret = new Currency(player, CurrencyType.Meret, BigInt(2000));
        this.gameMeret = new Currency(player, CurrencyType.GameMeret, BigInt(2000));
        this.eventMeret = new Currency(player, CurrencyType.EventMeret, BigInt(2000));
        this.valorToken = new Currency(player, CurrencyType.ValorToken, BigInt(2000));
        this.treva = new Currency(player, CurrencyType.Treva, BigInt(2000));
        this.rue = new Currency(player, CurrencyType.Rue, BigInt(2000));
        this.haviFruit = new Currency(player, CurrencyType.HaviFruit, BigInt(2000));
        this.mesoToken = new Currency(player, CurrencyType.MesoToken, BigInt(2000));
    }
}
