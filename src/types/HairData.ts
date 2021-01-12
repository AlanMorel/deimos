export class HairData {

    public backLength: number;
    public frontLength: number;

    public backPositionArray: Buffer;
    public frontPositionArray: Buffer;

    public constructor(backLength: number, frontLength: number, backPositionArray: Buffer, frontPositionArray: Buffer) {
        this.backLength = backLength;
        this.frontLength = frontLength;
        this.backPositionArray = backPositionArray;
        this.frontPositionArray = frontPositionArray;
    }
}
