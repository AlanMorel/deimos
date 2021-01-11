export class HairData {

    private backLength: number;
    private frontLength: number;

    private backPositionArray: Buffer;
    private frontPositionArray: Buffer;

    public constructor(backLength: number, frontLength: number, backPositionArray: Buffer, frontPositionArray: Buffer) {
        this.backLength = backLength;
        this.frontLength = frontLength;
        this.backPositionArray = backPositionArray;
        this.frontPositionArray = frontPositionArray;
    }
}
