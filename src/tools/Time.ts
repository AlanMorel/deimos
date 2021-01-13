import os from "os";

export class Time {

    public static getTickCount(): number {
        return os.uptime();
    }

    public static getUnixTimeSeconds(): number {
        return Math.round(Date.now() / 1000);
    }
}
