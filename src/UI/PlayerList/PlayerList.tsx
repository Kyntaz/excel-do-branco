import { useState } from "react";
import { Controller } from "../../Controller/Controller";
import { Person } from "../../Model/Person";

function PersonView({ person }: { person: Person }) {
    return (
        <li className="list-group-item" key={person.name}>
            {person.name}
        </li>
    );
}

export function PlayerList() {
    const controller = Controller.getControllerInstance();
    const session = controller.getCurrentSession();
    const [players, setPlayers] = useState(session.getPlayers());
    const [inputValue, setInputValue] = useState("");
    
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
                />
                <button
                    className="btn btn-success"
                    onClick={() => controller.addPlayer(inputValue)}
                    disabled={disableCreate}
                >Add Player</button>
            </div>
            <ul className="list-group mt-3">
                {playerViews}
            </ul>
        </div>
    );
}