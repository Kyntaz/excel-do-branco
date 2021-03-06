import { Session } from "../../Model/Session";
import React, { useState } from "react";
import { Controller } from "../../Controller/Controller";

function SessionView({ session }: { session: Session }) {
    const controller = Controller.getControllerInstance();

    return (
        <li className="list-group-item" key={session.name}>
            <button className="btn btn-outline-primary" onClick={() => controller.selectSession(session)}>
                {session.name}
            </button>
            <button className="btn btn-danger float-end" onClick={() => controller.deleteSession(session)}>
                🗑️ Delete
            </button>
        </li>
    );
}

export function SessionList() {
    const controller = Controller.getControllerInstance();
    const [sessions, setSessions] = useState(controller.getSessions());
    const [inputValue, setInputValue] = useState("");

    const createSession = () => {
        const newSession = controller.createSession(inputValue);
        controller.selectSession(newSession);
    }

    const keyListener = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case "Enter":
                createSession();
                break;
        }
    }
    
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
                    onKeyDown={keyListener}
                />
                <button
                    className="btn btn-success"
                    onClick={createSession}
                    disabled={disableCreate}
                >Create Session</button>
            </div>
            <ul className="list-group mt-3">
                {sessionViews}
            </ul>
        </div>
    );
}