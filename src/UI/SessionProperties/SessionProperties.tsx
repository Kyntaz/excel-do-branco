import { useState } from "react";
import { Controller } from "../../Controller/Controller";
import { EventList } from "../EventList/EventList";
import { PlayerList } from "../PlayerList/PlayerList";

enum TabId { Players, Events, PaymentPlan };

function Tab({ tabId, tabName, activeTab, setActiveTab }: {
    tabId: TabId,
    tabName: string,
    activeTab: TabId,
    setActiveTab: (tab: TabId) => void,
}) {
    const makeNavLinkClass = (tab: TabId) => activeTab === tab ? "nav-link active" : "nav-link";

    return (
        <li className="nav-item">
            <button
                className={makeNavLinkClass(tabId)}
                onClick={() => setActiveTab(tabId)}
            >{tabName}</button>
        </li>
    );
}

export function SessionProperties() {
    const controller = Controller.getControllerInstance();
    const session = controller.getCurrentSession();
    const [activeTab, setActiveTab] = useState(TabId.Players);
    const tabContents = {
        [TabId.Players]: <PlayerList />,
        [TabId.Events]: <EventList />,
        [TabId.PaymentPlan]: <div></div>,
    }

    return (
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item disabled">
                    <button
                        className="nav-link disabled text-success"
                    >{session.name}</button>
                </li>
                <Tab
                    tabId={TabId.Players}
                    tabName="Players"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <Tab
                    tabId={TabId.Events}
                    tabName="Events"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <Tab
                    tabId={TabId.PaymentPlan}
                    tabName="Payment Plan"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <li className="nav-item">
                    <button
                        className="nav-link text-danger"
                        onClick={() => controller.leaveSession()}
                    >Leave Session</button>
                </li>
            </ul>
            {tabContents[activeTab]}
        </div>
    );
}