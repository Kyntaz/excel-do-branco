import { EventUnit } from "./EventUnit";
import { IEvent } from "./IEvent";
import { Person } from "./Person";
import { IncomeRecord } from "./Records";

export class Income implements IEvent {
    public type = "income";

    public static fromRecord(record: IncomeRecord, players: Person[]) {
        const toPersons = record.to.map((name) => {
            const [toPerson] = players.filter((player) => player.name === name);
            return toPerson;
        });
        return new Income(record.name, toPersons, record.value);
    }

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
            to: this.to.map((person) => person.name),
            value: this.value,
        };
    }

    public toEventUnits(): EventUnit[] {
        const valueForEach = this.value / this.to.length;
        return this.to.map((person) => new EventUnit(person, valueForEach));
    }
}
