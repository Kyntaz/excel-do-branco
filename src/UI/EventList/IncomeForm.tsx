import { useState } from "react";
import { Controller } from "../../Controller/Controller";
import { Person } from "../../Model/Person";

export function IncomeForm({ cancel }: { cancel: () => void }) {
    const controller = Controller.getControllerInstance();
    const session = controller.getCurrentSession();
    const players = session.getPlayers();

    const [name, setName] = useState("");
    const [value, setValue] = useState(0);
    const [to, setTo] = useState(players);

    const togglePlayer = (player: Person) => {
        if (to.includes(player)) {
            setTo(to.filter((p) => p !== player));
        } else {
            setTo([...to, player]);
        }
    };

    const createIncome = () => {
        controller.addIncome(name, to.map((p) => p.name), value);
        cancel();
    };

    const playerOptions = players.map((player) => (
            <div className="form-check form-check-inline">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={to.includes(player)}
                    onChange={() => togglePlayer(player)}
                />
                <label className="form-check-label">
                    {player.name}
                </label>
            </div>
        ));

    return (
        <div className="container my-3 p-3 border">
            <h5>New Income</h5>
            <div className="input-group mb-3">
                <span className="input-group-text">Name</span>
                <input 
                    className="form-control"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Value</span>
                <input
                    className="form-control"
                    type="number"
                    value={value}
                    onChange={(event) => setValue(parseFloat(event.target.value))}
                />
            </div>
            <div className="container border my-3 p-3">
                <span className="me-3">Earned by:</span>
                {playerOptions}
            </div>
            <button
                className="btn btn-success me-3"
                onClick={createIncome}
            >Create</button>
            <button
                className="btn btn-danger"
                onClick={cancel}
            >Cancel</button>
        </div>
    );
}
