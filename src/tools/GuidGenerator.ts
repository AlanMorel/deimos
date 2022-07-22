import { BitConverter } from "@/tools/BitConverter";
import { v4 as uuidv4 } from "uuid";

export class GuidGenerator {
    public static generateLong(): bigint {
        const uuid = uuidv4().replace(/-/g, "");
        const buffer = Buffer.from(uuid, "hex");
        return BitConverter.toUInt64(buffer) >> 1n;
    }
}
