interface ObjectLiteral {
    [key: string]: any;
}

export abstract class Controller<T1 extends ObjectLiteral, T2> {
    protected abstract fromDatabase(from: T1): T2;
    protected abstract toDatabase(to: T2): T1;
}
