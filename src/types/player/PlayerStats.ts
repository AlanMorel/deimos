import { PacketWriter } from "@/crypto/protocol/PacketWriter";
import { PlayerStat } from "@/types/player/PlayerStat";

export class PlayerStats {
    public str: PlayerStat = new PlayerStat(100, 0, 100);
    public dex: PlayerStat = new PlayerStat(100, 0, 100);
    public int: PlayerStat = new PlayerStat(100, 0, 100);
    public luk: PlayerStat = new PlayerStat(100, 0, 100);
    public hp: PlayerStat = new PlayerStat(1000, 0, 1000);
    public currentHp: PlayerStat = new PlayerStat(0, 500, 100);
    public hpRegen: PlayerStat = new PlayerStat(100, 0, 100);
    public unknown7: PlayerStat = new PlayerStat(100, 0, 100); // (3000, 3000, 3000)
    public spirit: PlayerStat = new PlayerStat(100, 100, 100);
    public unknown9: PlayerStat = new PlayerStat(100, 0, 100); // (10, 10, 10)
    public unknown10: PlayerStat = new PlayerStat(100, 0, 100); // (500, 500, 500)
    public stamina: PlayerStat = new PlayerStat(100, 0, 100); // (10, 10, 10)
    public unknown12: PlayerStat = new PlayerStat(100, 0, 100); // (500, 500, 500)
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
        const playerStats = [
            stats.str,
            stats.dex,
            stats.int,
            stats.luk,
            stats.hp,
            stats.currentHp,
            stats.hpRegen,
            stats.unknown7,
            stats.spirit,
            stats.unknown9,
            stats.unknown10,
            stats.stamina,
            stats.unknown12,
            stats.unknown13,
            stats.atkSpd,
            stats.moveSpd,
            stats.acc,
            stats.eva,
            stats.critRate,
            stats.critDmg,
            stats.critEva,
            stats.def,
            stats.guard,
            stats.jumpHeight,
            stats.physAtk,
            stats.magAtk,
            stats.physRes,
            stats.magRes,
            stats.minAtk,
            stats.maxAtk,
            stats.unknown30,
            stats.unknown31,
            stats.pierce,
            stats.mountSpeed,
            stats.bonusAtk,
            stats.unknown35
        ];

        for (const stat of playerStats) {
            PlayerStat.write(packet, stat);
        }
    }
}
