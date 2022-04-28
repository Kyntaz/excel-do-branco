import { EventUnit } from "./EventUnit";
import { IEvent } from "./IEvent";
import { Person } from "./Person";
import { IncomeRecord } from "./Records";

export class Income implements IEvent {
    public type = "income";

    constructor(public name: string, private to: Person[], private value: number) {}

    public getTo() {
        return this.to;
    }

    public getValue() {
        return this.value;
    }

    public toRecord(): IncomeRecord {
        return {
            type: "income",
            name: this.name,
            to: this.to.map((person) => person.toRecord()),
            value: this.value,
        };
    }

    public toEventUnits(): EventUnit[] {
        const valueForEach = this.value / this.to.length;
        return this.to.map((person) => new EventUnit(person, valueForEach));
    }
}
