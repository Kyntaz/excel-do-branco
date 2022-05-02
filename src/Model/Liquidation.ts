import { EventUnit } from "./EventUnit";
import { IEvent } from "./IEvent";
import { Person } from "./Person";
import { LiquidationRecord } from "./Records";

export class Liquidation implements IEvent {
    public type = "liquidation";

    public static fromEventUnit(eventUnit: EventUnit) {
        const person = eventUnit.getPerson();
        const value = eventUnit.getValue();
        return new Liquidation(`Liquidate ${person.name}`, person, -value);
    }

    public static fromRecord(record: LiquidationRecord, players: Person[]) {
        const [person] = players.filter((player) => player.name === record.person);
        return new Liquidation(record.name, person, record.value);
    }

    constructor(public name: string, private person: Person, private value: number) { }

    public getPerson() {
        return this.person;
    }

    public getValue() {
        return this.value;
    }

    public toRecord(): LiquidationRecord {
        return {
            type: "liquidation",
            name: this.name,
            person: this.person.name,
            value: this.value,
        };
    }

    public toEventUnits(): EventUnit[] {
        return [new EventUnit(this.person, this.value)];
    }
}