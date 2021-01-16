import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { PlayerStat } from "./PlayerStat";

export class PlayerStats {
    // Total 36 Stats MUST be in this order (Struct)
    public str: PlayerStat = new PlayerStat(100, 0, 100);
    public dex: PlayerStat = new PlayerStat(100, 0, 100);
    public int: PlayerStat = new PlayerStat(100, 0, 100);
    public luk: PlayerStat = new PlayerStat(100, 0, 100);
    public hp: PlayerStat = new PlayerStat(1000, 0, 1000);
    public currentHp: PlayerStat = new PlayerStat(0, 500, 100);
    public hpRegen: PlayerStat = new PlayerStat(100, 0, 100);
    public unknown7: PlayerStat = new PlayerStat(100, 0, 100);     // (3000, 3000, 3000)
    public spirit: PlayerStat = new PlayerStat(100, 100, 100);
    public unknown9: PlayerStat = new PlayerStat(100, 0, 100);     // (10, 10, 10)
    public unknown10: PlayerStat = new PlayerStat(100, 0, 100);    // (500, 500, 500)
    public stamina: PlayerStat = new PlayerStat(100, 0, 100);      // (10, 10, 10)
    public unknown12: PlayerStat = new PlayerStat(100, 0, 100);    // (500, 500, 500)
    public unknown13: PlayerStat = new PlayerStat(100, 0, 100);
    public atkSpd: PlayerStat = new PlayerStat(100, 1000, 100);
    public moveSpd: PlayerStat = new PlayerStat(100, 1000, 100);
    public acc: PlayerStat = new PlayerStat(100, 0, 100);
    public eva: PlayerStat = new PlayerStat(100, 0, 100);
    public critRate: PlayerStat = new PlayerStat(100, 0, 100);
    public critDmg: PlayerStat = new PlayerStat(100, 0, 100);
    public critEva: PlayerStat = new PlayerStat(100, 0, 100);
    public def: PlayerStat = new PlayerStat(100, 0, 100);
    public guard: PlayerStat = new PlayerStat(100, 0, 100);
    public jumpHeight: PlayerStat = new PlayerStat(100, 1000, 100);
    public physAtk: PlayerStat = new PlayerStat(100, 0, 100);
    public magAtk: PlayerStat = new PlayerStat(100, 0, 100);
    public physRes: PlayerStat = new PlayerStat(100, 0, 100);
    public magRes: PlayerStat = new PlayerStat(100, 0, 100);
    public minAtk: PlayerStat = new PlayerStat(100, 0, 100);
    public maxAtk: PlayerStat = new PlayerStat(100, 0, 100);
    public unknown30: PlayerStat = new PlayerStat(100, 0, 100);
    public unknown31: PlayerStat = new PlayerStat(100, 0, 100);
    public pierce: PlayerStat = new PlayerStat(100, 0, 100);
    public mountSpeed: PlayerStat = new PlayerStat(100, 100, 100);
    public bonusAtk: PlayerStat = new PlayerStat(100, 0, 100);
    public unknown35: PlayerStat = new PlayerStat(100, 0, 100);

    public static write(packet: PacketWriter, stats: PlayerStats): void {
        PlayerStat.write(packet, stats.str);
        PlayerStat.write(packet, stats.dex);
        PlayerStat.write(packet, stats.int);
        PlayerStat.write(packet, stats.luk);
        PlayerStat.write(packet, stats.hp);
        PlayerStat.write(packet, stats.currentHp);
        PlayerStat.write(packet, stats.hpRegen);
        PlayerStat.write(packet, stats.unknown7);     // (3000, 3000, 3000)
        PlayerStat.write(packet, stats.spirit);
        PlayerStat.write(packet, stats.unknown9);     // (10, 10, 10)
        PlayerStat.write(packet, stats.unknown10);    // (500, 500, 500)
        PlayerStat.write(packet, stats.stamina);      // (10, 10, 10)
        PlayerStat.write(packet, stats.unknown12);    // (500, 500, 500)
        PlayerStat.write(packet, stats.unknown13);
        PlayerStat.write(packet, stats.atkSpd);
        PlayerStat.write(packet, stats.moveSpd);
        PlayerStat.write(packet, stats.acc);
        PlayerStat.write(packet, stats.eva);
        PlayerStat.write(packet, stats.critRate);
        PlayerStat.write(packet, stats.critDmg);
        PlayerStat.write(packet, stats.critEva);
        PlayerStat.write(packet, stats.def);
        PlayerStat.write(packet, stats.guard);
        PlayerStat.write(packet, stats.jumpHeight);
        PlayerStat.write(packet, stats.physAtk);
        PlayerStat.write(packet, stats.magAtk);
        PlayerStat.write(packet, stats.physRes);
        PlayerStat.write(packet, stats.magRes);
        PlayerStat.write(packet, stats.minAtk);
        PlayerStat.write(packet, stats.maxAtk);
        PlayerStat.write(packet, stats.unknown30);
        PlayerStat.write(packet, stats.unknown31);
        PlayerStat.write(packet, stats.pierce);
        PlayerStat.write(packet, stats.mountSpeed);
        PlayerStat.write(packet, stats.bonusAtk);
        PlayerStat.write(packet, stats.unknown35);
    }
}
