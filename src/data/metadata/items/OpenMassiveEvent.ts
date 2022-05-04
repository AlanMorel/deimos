export class OpenMassiveEvent {
    public fieldId: number;
    public capacity: number;
    public duration: number;

    public constructor(fieldId: number, capacity: number, duration: number) {
        this.fieldId = fieldId;
        this.capacity = capacity;
        this.duration = duration;
    }
}
