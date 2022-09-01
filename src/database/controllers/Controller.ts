import { EntityTarget, getRepository, Repository } from "typeorm";

interface ObjectLiteral {
    [key: string]: any;
}

export abstract class Controller<T1 extends ObjectLiteral, T2> {
    protected repository: Repository<T1>;

    public constructor(entity: EntityTarget<T1>) {
        this.repository = getRepository<T1>(entity);
    }

    protected abstract fromDatabase(from: T1): T2;
    protected abstract toDatabase(to: T2): T1;
}
