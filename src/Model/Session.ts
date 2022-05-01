import { Person } from "./Person";
import { IEvent } from "./IEvent";
import { SessionRecord } from "./Records";
import { EventUnit } from "./EventUnit";
import { Income } from "./Income";
import { Payment } from "./Payment";

export class Session {
    private players: Person[] = [];
    private events: IEvent[] = [];

    public static fromRecord(record: SessionRecord) {
        const session = new Session(record.name);

        const players = record.players.map((playerRecord) => Person.fromRecord(playerRecord));
        
        const events = record.events.map((eventRecord) => {
            if (eventRecord.type === "income") {
                return Income.fromRecord(eventRecord, players);
            } else if (eventRecord.type === "payment") {
                return Payment.fromRecord(eventRecord, players);
            } else {
                throw new Error("Unknown event type while reading session");
            }
        });

        for (const player of players) {
            session.addPlayer(player);
        }

        for (const event of events) {
            session.addEvent(event);
        }

        return session;
    }

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
