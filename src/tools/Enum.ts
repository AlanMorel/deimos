export class Enum {

    public static getLength(enumType: Enum): number {
        return Object.values(enumType).length / 2;
    }
}
