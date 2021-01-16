export class KeyBind {

    public keyCode: number;
    public optionType: number;
    public optionGuid: BigInt;
    // Haven't found a non-zero value for this
    public unknown1: number;
    public priority: number;

    public constructor(keyCode: number, optionType: number, optionGuid: BigInt, priority: number, unknown1: number = 0) {
        this.keyCode = keyCode;
        this.optionType = optionType;
        this.optionGuid = optionGuid;
        this.priority = priority;
        this.unknown1 = unknown1;
    }
}
