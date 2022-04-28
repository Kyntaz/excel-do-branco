import { EventUnit } from "./EventUnit";
import { IEvent } from "./IEvent";
import { Person } from "./Person";
import { PaymentRecord } from "./Records";

export class Payment implements IEvent {
    public type = "payment";

    constructor(public name: string, private from: Person, private to: Person[], private value: number) {}

    public getFrom() {
        return this.from;
    }

    public getTo() {
        return this.to;
    }

    public getValue() {
        return this.value;
    }

    public toRecord(): PaymentRecord {
        return {
            type: "payment",
            name: this.name,
            from: this.from.toRecord(),
            to: this.to.map((person) => person.toRecord()),
            value: this.value,
        };
    }

    public toEventUnits(): EventUnit[] {
        const valueForEach = this.value / this.to.length;
        return [
            new EventUnit(this.from, this.value),
            ...this.to.map((person) => new EventUnit(person, -valueForEach)),
        ];
    }
}
