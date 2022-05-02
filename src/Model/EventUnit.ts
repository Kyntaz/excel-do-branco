import { Person } from "./Person";

export class EventUnit {
    public static combine(eventUnits: EventUnit[]): EventUnit[] {
        const people = [...new Set(eventUnits.map((unit) => unit.getPerson()))];
        return people.map((person) => {
            const unitsOfPerson = eventUnits.filter((unit) => unit.getPerson() === person);
            const value = unitsOfPerson.reduce((sum, unit) => sum + unit.getValue(), 0);
            return new EventUnit(person, value);
        });
    }

    constructor(private person: Person, private value: number) {}

    public getPerson() {
        return this.person;
    }

    public getValue() {
        return this.value;
    }
}
