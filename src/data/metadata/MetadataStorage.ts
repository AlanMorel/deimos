export abstract class MetadataStorage<T> {

    protected readonly storage = new Map<number, T>();

    public abstract load(data: T[]): void;
}
