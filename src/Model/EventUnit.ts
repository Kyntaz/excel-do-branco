import { Person } from "./Person";

export class EventUnit {
    constructor(private person: Person, private value: number) {}

    getPerson() {
        return this.person;
    }

    getValue() {
        return this.value;
    }

    static combine(eventUnits: EventUnit[]): EventUnit[] {
        const people = [...new Set(eventUnits.map((unit) => unit.getPerson()))];
        return people.map((person) => {
            const unitsOfPerson = eventUnits.filter((unit) => unit.getPerson() === person);
            const value = unitsOfPerson.reduce((sum, unit) => sum + unit.getValue(), 0);
            return new EventUnit(person, value);
        });
    }
}
