import { v4 as uuidv4 } from "uuid";

export class GuidGenerator {

    public static generateLong(): bigint {
        return BigInt(uuidv4().replace(/-/g, ""));
    }
}
