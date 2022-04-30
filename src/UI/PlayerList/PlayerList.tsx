import { useState } from "react";
import { Controller } from "../../Controller/Controller";
import { Person } from "../../Model/Person";

function PersonView({ person }: { person: Person }) {
    const controller = Controller.getControllerInstance();

    return (
        <li className="list-group-item" key={person.name}>
            <span className="btn disabled btn-outline-dark">
                {person.name}
            </span>
            <button className="btn btn-danger float-end" onClick={() => controller.removePlayer(person)}>
                🗑️ Remove
            </button>
        </li>
    );
}

export function PlayerList() {
    const controller = Controller.getControllerInstance();
    const session = controller.getCurrentSession();
    const [players, setPlayers] = useState(session.getPlayers());
    const [inputValue, setInputValue] = useState("");

    const addPlayer = () => {
        controller.addPlayer(inputValue);
        setInputValue("");
    };

    const keyListener = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case "Enter":
                addPlayer();
                break;
        }
    }
    
    controller.defineSetPlayers(setPlayers);
    const playerViews = players
        .filter((player) => player.name.includes(inputValue))
        .map((player) => <PersonView person={player} />);
    const disableCreate = !inputValue || players.some((player) => player.name === inputValue);
    
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
                    onClick={addPlayer}
                    disabled={disableCreate}
                >Add Player</button>
            </div>
            <ul className="list-group mt-3">
                {playerViews}
            </ul>
        </div>
    );
}