import { Session } from "../Model/Session";
import { IEvent } from "../Model/IEvent";
import { Person } from "../Model/Person";
import { Income } from "../Model/Income";
import { Payment } from "../Model/Payment";

export class Controller {
    private sessions: Session[] = [];
    private currentSession: Session | null = null;
    private setSessions?: (sessions: Session[]) => void;
    private setCurrentSession?: (session: Session | null) => void;
    private setEvents?: (events: IEvent[]) => void;
    private setPlayers?: (players: Person[]) => void;
    private static controllerInstance: Controller;

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

    public getSessions() {
        return this.sessions;
    }

    public getCurrentSessionOrNull() {
        return this.currentSession;
    }

    public getCurrentSession() {
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
        const newSession = new Session(name);
        this.sessions = [...this.sessions, newSession]
        this.trySetSessions(this.sessions);
        return newSession;
    }

    public deleteSession(session: Session) {
        this.sessions = this.sessions.filter((s) => s !== session);
        this.trySetSessions(this.sessions);
    }

    public addPlayer(name: string) {
        const session = this.getCurrentSession();
        session.addPlayer(new Person(name));
        this.trySetPlayers(session.getPlayers());
    }

    public removePlayer(player: Person) {
        const session = this.getCurrentSession();
        session.removePlayer(player);
        this.trySetPlayers(session.getPlayers());
    }

    public addIncome(name: string, to: string[], value: number) {
        const session = this.getCurrentSession();
        const playersTo = session.findPlayers(to);
        session.addEvent(new Income(name, playersTo, value));
        this.trySetEvents(session.getEvents());
    }

    public addPayment(name: string, from: string, to: string[], value: number) {
        const session = this.getCurrentSession();
        const playersTo = session.findPlayers(to);
        const playerFrom = session.findPlayer(from);
        session.addEvent(new Payment(name, playerFrom, playersTo, value));
        this.trySetEvents(session.getEvents());
    }

    public removeEvent(event: IEvent) {
        const session = this.getCurrentSession();
        session.removeEvent(event);
        this.trySetEvents(session.getEvents());
    }
}
