import { SessionRecord } from "../Model/Records";
import { Session } from "../Model/Session";

const DEFAULT_STORAGE_KEY = "sessions";

export class Storage {
    private key = DEFAULT_STORAGE_KEY;
    private localStorage = localStorage;

    public storeSessions(sessions: Session[]) {
        const records = sessions.map((session) => session.toRecord())
        this.localStorage.setItem(this.key, JSON.stringify(records));
    }

    public readSessions(): Session[] {
        const storedString = this.localStorage.getItem(this.key);
        
        if (!storedString) {
            return [];
        }

        const records: SessionRecord[] = JSON.parse(storedString);
        return records.map((record) => Session.fromRecord(record));
    }
}
