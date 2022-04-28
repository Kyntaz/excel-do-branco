export type PersonRecord = {
    name: string,
};

export type PaymentRecord = {
    type: "payment",
    name: string,
    from: PersonRecord,
    to: PersonRecord[],
    value: number,
};

export type IncomeRecord = {
    type: "income",
    name: string,
    to: PersonRecord[],
    value: number,
};

export type EventRecord = PaymentRecord | IncomeRecord;

export type SessionRecord = {
    name: string,
    players: PersonRecord[],
    events: EventRecord[],
};
