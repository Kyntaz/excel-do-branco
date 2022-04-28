import { Session } from "../../Model/Session";
import { useState } from "react";
import { Controller } from "../../Controller/Controller";

function SessionView({ session }: { session: Session }) {
    const controller = Controller.getControllerInstance();

    return (
        <li className="list-group-item" key={session.name}>
            <button className="btn btn-outline-primary" onClick={() => controller.selectSession(session)}>
                {session.name}
            </button>
        </li>
    );
}

export function SessionList() {
    const controller = Controller.getControllerInstance();
    const [sessions, setSessions] = useState(controller.getSessions());
    const [inputValue, setInputValue] = useState("");
    
    controller.defineSetSessions(setSessions);
    const sessionViews = sessions
        .filter((session) => session.name.includes(inputValue))
        .map((session) => <SessionView session={session} />);
    const disableCreate = !inputValue || sessions.some((session) => session.name === inputValue);
    
    return (
        <div className="mt-5 container">
            <div className="input-group">
                <input
                    className="form-control"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                />
                <button
                    className="btn btn-success"
                    onClick={() => controller.createSession(inputValue)}
                    disabled={disableCreate}
                >Create Session</button>
            </div>
            <ul className="list-group mt-3">
                {sessionViews}
            </ul>
        </div>
    );
}