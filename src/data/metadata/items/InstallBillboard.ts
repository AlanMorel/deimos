export class InstallBillboard {
    public interactionId: number;
    public model: string;
    public asset: string;
    public normalState: string;
    public retractable: string;
    public scale: number;
    public duration: number;

    public constructor(
        interactionId: number,
        model: string,
        asset: string = "",
        normalState: string,
        retractable: string,
        scale: number = 1,
        duration: number
    ) {
        this.interactionId = interactionId;
        this.model = model;
        this.asset = asset;
        this.normalState = normalState;
        this.retractable = retractable;
        this.scale = scale;
        this.duration = duration;
    }
}
