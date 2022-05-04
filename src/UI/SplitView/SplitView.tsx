import { useState } from "react";
import { Controller } from "../../Controller/Controller";
import { EventUnit } from "../../Model/EventUnit";
import { roundToCents } from "../../Utils/MoneyUtils";

function EventUnitView({ eventUnit }: { eventUnit: EventUnit }) {
    const controller = Controller.getControllerInstance();
    const value = eventUnit.getValue();

    const [payed, setPayed] = useState(false);

    if (payed || value === 0) {
        return (<></>);
    }

    const pay = () => {
        controller.liquidateEventUnit(eventUnit);
        setPayed(true);
    };

    const name = eventUnit.getPerson().name;
    const verb = value > 0 ? "gets" : "pays";
    const amount = roundToCents(value);

    return (
        <li className="list-group-item">
            <span className="btn disabled btn-outline-dark">
                {name} {verb} {amount}€
            </span>
            <span
                className="btn btn-success float-end"
                onClick={pay}
            >
                ✔️ Payed
            </span>
        </li>
    );
}

export function SplitView() {
    const controller = Controller.getControllerInstance();
    const session = controller.getCurrentSession();
    const eventUnits = session.getEventUnits();

    const eventViews = eventUnits.map((unit) => <EventUnitView eventUnit={unit} />)

    return (
        <div className="container">
            <ul className="list-group mt-5">
                {eventViews}
            </ul>
        </div>
    );
}