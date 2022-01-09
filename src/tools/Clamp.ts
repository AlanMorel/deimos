export class Clamp {
    public static clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);
}
