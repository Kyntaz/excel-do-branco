import { PersonRecord } from "./Records";

export class Person {
    public static fromRecord(record: PersonRecord) {
        return new Person(record.name);
    }

    constructor(public name: string) {}

    public toRecord(): PersonRecord {
        return {
            name: this.name,
        };
    }
}