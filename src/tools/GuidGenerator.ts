import { v4 as uuidv4 } from "uuid";
import { BitConverter } from "./BitConverter";

export class GuidGenerator {

    public static generateLong(): BigInt {
        const uuid = uuidv4().replaceAll("-", "");
        const buffer = Buffer.from(uuid, "hex");
        return BitConverter.toUInt64(buffer, 0) >> 1n;
    }
}
