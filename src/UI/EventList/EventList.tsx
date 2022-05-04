import { useState } from "react";
import { Controller } from "../../Controller/Controller";
import { IEvent } from "../../Model/IEvent";
import { Income } from "../../Model/Income";
import { Liquidation } from "../../Model/Liquidation";
import { Payment } from "../../Model/Payment";
import { IncomeForm } from "./IncomeForm";
import { PaymentForm } from "./PaymentForm";

function EventView({ event }: { event: IEvent }) {
    const controller = Controller.getControllerInstance();

    let eventContent: JSX.Element;
    if (event.type === "income") {
        const income = event as Income;
        const toString = income.getTo().map((person) => person.name).join(", ");
        const colorClass = income.getValue() > 0 ? "btn-success" : "btn-danger";
        eventContent = (
            <>
                <span className={"btn disabled " + colorClass}>
                    {income.name}
                </span>
                <span className="btn disabled btn-outline-dark ms-3">
                    {income.getValue()}€ for {toString}
                </span>
            </>
        );
    } else if (event.type === "payment") {
        const payment = event as Payment;
        const toString = payment.getTo().map((person) => person.name).join(", ");
        eventContent = (
            <>
                <span className="btn disabled btn-primary">
                    {payment.name}
                </span>
                <span className="btn disabled btn-outline-dark ms-3">
                    {payment.getValue()}€ from {payment.getFrom().name} to {toString}
                </span>
            </>
        );
    } else if (event.type === "liquidation") {
        const liquidation = event as Liquidation;
        eventContent = (
            <>
                <span className="btn disabled btn-info">
                    {liquidation.name}
                </span>
                <span className="btn disabled btn-outline-dark ms-3">
                    {liquidation.getValue()}€
                </span>
            </>
        );
    } else {
        eventContent = (
            <>Other Event: {event.name}</>
        );
    }

    return (
        <li className="list-group-item" key={event.name}>
            {eventContent}
            <button className="btn btn-danger float-end" onClick={() => controller.removeEvent(event)}>
                🗑️ Remove
            </button>
        </li>
    );
}

export function EventList() {
    const controller = Controller.getControllerInstance();
    const session = controller.getCurrentSession();
    const [events, setEvents] = useState(session.getEvents());
    const [inputValue, setInputValue] = useState("");
    const [createForm, setCreateForm] = useState<"income" | "payment" | null>(null);
    
    controller.defineSetEvents(setEvents);
    const createFormMap = {
        income: <IncomeForm cancel={() => setCreateForm(null)} />,
        payment: <PaymentForm cancel={() => setCreateForm(null)} />,
    };
    const eventViews = events
        .filter((event) => event.name.includes(inputValue))
        .map((event) => <EventView event={event} />);
    
    return (
        <div className="mt-5 container">
            <div className="input-group">
                <input
                    className="form-control"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                />
                <button
                    className="btn btn-primary"
                    onClick={() => setCreateForm("income")}
                >Add Income</button>
                <button
                    className="btn btn-primary"
                    onClick={() => setCreateForm("payment")}
                >Add Payment</button>
            </div>
            {createForm ? createFormMap[createForm] : <></>}
            <ul className="list-group mt-3">
                {eventViews}
            </ul>
        </div>
    );
}
