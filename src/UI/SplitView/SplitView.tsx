import { Controller } from "../../Controller/Controller";
import { EventUnit } from "../../Model/EventUnit";

function EventUnitView({ eventUnit }: { eventUnit: EventUnit }) {
    const value = eventUnit.getValue();

    if (value === 0) {
        return (<></>);
    }

    const name = eventUnit.getPerson().name;
    const verb = value > 0 ? "gets" : "pays";
    const amount = Math.round((Math.abs(value) + Number.EPSILON) * 100) / 100;

    return (
        <li className="list-group-item">
            {name} {verb} {amount}€
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