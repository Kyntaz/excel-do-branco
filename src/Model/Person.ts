import { PersonRecord } from "./Records";

export class Person {
    constructor(public name: string) {}

    public toRecord(): PersonRecord {
        return {
            name: this.name,
        };
    }
}