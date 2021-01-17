import { Field } from "./Field";

export class FieldFactory {

    private fields: Map<number, Field> = new Map<number, Field>();

    public getField(id: number): Field {
        let field = this.fields.get(id);

        if (!field) {
            field = new Field(id);
            this.fields.set(id, field);
        }

        return field;
    }
}
