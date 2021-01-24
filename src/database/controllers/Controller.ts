import { EntityTarget, getRepository, Repository } from "typeorm";

export abstract class Controller<T> {

    protected repository: Repository<T>;

    public constructor(entity: EntityTarget<T>) {
        this.repository = getRepository<T>(entity);
    }
}
