import { v4 as uuidv4 } from "uuid";
import { BitConverter } from "../crypto/BitConverter";

export class GuidGenerator {

    public static generateLong(): bigint {
        const uuid = uuidv4().replaceAll("-", "");
        const buffer = Buffer.from(uuid, "hex");
        return BitConverter.toUInt64(buffer, 0);
    }
}
