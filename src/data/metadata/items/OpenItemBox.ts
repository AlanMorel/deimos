export class OpenItemBox {
    public requiredItemId: number;
    public receiveOneItem: boolean;
    public boxId: number;
    public amountRequired: number;

    public constructor(requiredItemId: number, receiveOneItem: boolean, boxId: number, amountRequired: number) {
        this.requiredItemId = requiredItemId;
        this.receiveOneItem = receiveOneItem;
        this.boxId = boxId;
        this.amountRequired = amountRequired;
    }
}
