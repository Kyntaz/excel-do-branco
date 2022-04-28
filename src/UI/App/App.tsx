import { SessionProperties } from "../SessionProperties/SessionProperties";
import { useState } from "react";
import { Controller } from "../../Controller/Controller";
import { SessionList } from "../SessionList/SessionList";

export function App() {
    const controller = Controller.getControllerInstance()
    const [currentSession, setCurrentSession] = useState(controller.getCurrentSessionOrNull());
    controller.defineSetCurrentSession(setCurrentSession);

    const innerContent = currentSession ? <SessionProperties /> : <SessionList />;

    return (
        <div>
            <h1 className="text-center mt-3">📝 Excel do Branco</h1>
            {innerContent}
        </div>
    );
}
