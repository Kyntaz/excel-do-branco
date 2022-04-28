import { EventUnit } from "./EventUnit";
import { EventRecord } from "./Records";

export interface IEvent {
    type: string;
    name: string;
    toRecord(): EventRecord;
    toEventUnits(): EventUnit[];
}
