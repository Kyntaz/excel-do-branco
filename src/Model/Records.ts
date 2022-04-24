export type PersonRecord = {
    name: string,
};

export type PaymentRecord = {
    type: "payment",
    from: PersonRecord,
    to: PersonRecord[],
    value: number,
};

export type IncomeRecord = {
    type: "income",
    to: PersonRecord[],
    value: number,
};

export type EventRecord = PaymentRecord | IncomeRecord;

export type SessionRecord = {
    name: string,
    players: PersonRecord[],
    events: EventRecord[],
};
