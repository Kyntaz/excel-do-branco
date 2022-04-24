import { Session } from "../Model/Session";
import { IEvent } from "../Model/IEvent";
import { Person } from "../Model/Person";
import { Income } from "../Model/Income";
import { Payment } from "../Model/Payment";
import { EventUnit } from "../Model/EventUnit";

export class Controller {
    private sessions: Session[] = [];
    private currentSession: Session | null = null;
    private setSessions?: (sessions: Session[]) => void;
    private setCurrentSession?: (session: Session | null) => void;
    private setEvents?: (events: IEvent[]) => void;
    private setPlayers?: (players: Person[]) => void;
    private setEventUnits?: (eventUnits: EventUnit[]) => void;
    static controllerInstance: Controller;

    static getControllerInstance(): Controller {
        if (!this.controllerInstance) {
            this.controllerInstance = new Controller();
        }

        return this.controllerInstance;
    }

    public defineSetSessions(setSessions: typeof this.setSessions) {
        this.setSessions = setSessions;
    }

    public defineSetCurrentSession(setCurrentSession: typeof this.setCurrentSession) {
        this.setCurrentSession = setCurrentSession;
    }

    public defineSetEvents(setEvents: typeof this.setEvents) {
        this.setEvents = setEvents;
    }

    public defineSetPlayers(setPlayers: typeof this.setPlayers) {
        this.setPlayers = setPlayers;
    }

    public defineSetEventUnits(setEventUnits: typeof this.setEventUnits) {
        this.setEventUnits = setEventUnits;
    }

    private trySetSessions(sessions: Session[]) {
        if (!this.setSessions) {
            throw new Error("setSessions is not defined");
        }
        this.setSessions(sessions);
    }

    private trySetCurrentSession(session: Session | null) {
        if (!this.setCurrentSession) {
            throw new Error("setCurrentSession is not defined");
        }
        this.setCurrentSession(session);
    }

    private trySetEvents(events: IEvent[]) {
        if (!this.setEvents) {
            throw new Error("setEvents is not defined");
        }
        this.setEvents(events);
    }

    private trySetPlayers(players: Person[]) {
        if (!this.setPlayers) {
            throw new Error("setPlayers is not defined");
        }
        this.setPlayers(players);
    }

    private trySetEventUnits(eventUnits: EventUnit[]) {
        if (!this.setEventUnits) {
            throw new Error("setEventUnits is not defined");
        }
        this.setEventUnits(eventUnits);
    }

    private getCurrentSession() {
        if (!this.currentSession) {
            throw new Error("No current session");
        }
        return this.currentSession;
    }

    public selectSession(session: Session) {
        this.currentSession = session;
        this.trySetCurrentSession(session);
    }

    public leaveSession() {
        this.currentSession = null;
        this.trySetCurrentSession(null);
    }

    public createSession(name: string) {
        this.sessions.push(new Session(name));
        this.trySetSessions(this.sessions);
    }

    public addPlayer(name: string) {
        const session = this.getCurrentSession();
        session.addPlayer(new Person(name));
        this.trySetPlayers(session.getPlayers());
    }

    private recalculateEventUnits(session: Session) {
        const eventUnits = session.getEventUnits();
        this.trySetEventUnits(eventUnits);
    }

    public addIncome(to: string[], value: number) {
        const session = this.getCurrentSession();
        const playersTo = session.findPlayers(to);
        session.addEvent(new Income(playersTo, value));
        this.trySetEvents(session.getEvents());
        this.recalculateEventUnits(session);
    }

    public addPayment(from: string, to: string[], value: number) {
        const session = this.getCurrentSession();
        const playersTo = session.findPlayers(to);
        const playerFrom = session.findPlayer(from);
        session.addEvent(new Payment(playerFrom, playersTo, value));
        this.trySetEvents(session.getEvents());
        this.recalculateEventUnits(session);
    }
}
