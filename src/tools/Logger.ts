export class Logger {

    public static log(message: string, color: number): void {
        console.log("\u001b[" + color + "m" + message + "\u001b[0m");
    }
}
