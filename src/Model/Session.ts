import { Person } from "./Person";
import { IEvent } from "./IEvent";
import { SessionRecord } from "./Records";
import { EventUnit } from "./EventUnit";

export class Session {
    private players: Person[] = [];
    private events: IEvent[] = [];

    constructor(public name: string) { }

    public addEvent(event: IEvent) {
        this.events = [...this.events, event];
    }

    public removeEvent(event: IEvent) {
        this.events = this.events.filter((e) => e !== event);
    }

    public addPlayer(player: Person) {
        this.players = [...this.players, player];
    }

    public removePlayer(player: Person) {
        this.players = this.players.filter((p) => p !== player);
    }

    public getEvents() {
        return this.events;
    }

    public getPlayers() {
        return this.players;
    }

    public toRecord(): SessionRecord {
        return {
            name: this.name,
            events: this.events.map((event) => event.toRecord()),
            players: this.players.map((player) => player.toRecord()),
        };
    }

    public getEventUnits() {
        const allEventUnits = this.events.reduce<EventUnit[]>(
            (units, event) => [...units, ...event.toEventUnits()],
            [],
        );
        return EventUnit.combine(allEventUnits);
    }

    public findPlayer(name: string) {
        const [player] = this.players.filter((person) => person.name === name);
        return player;
    }

    public findPlayers(names: string[]) {
        return this.players.filter((person) => names.includes(person.name));
    }
}
