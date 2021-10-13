export class Enum {
    public static getLength(enumType: Enum): number {
        return Object.values(enumType).length / 2;
    }

    public static hasFlag(flag: number, bit: number): boolean {
        return (flag & bit) != 0;
    }
}
