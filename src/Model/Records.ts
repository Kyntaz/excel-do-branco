export type PersonRecord = {
    name: string,
};

export type PaymentRecord = {
    type: "payment",
    name: string,
    from: string,
    to: string[],
    value: number,
};

export type IncomeRecord = {
    type: "income",
    name: string,
    to: string[],
    value: number,
};

export type LiquidationRecord = {
    type: "liquidation",
    name: string,
    person: string,
    value: number,
}

export type EventRecord = PaymentRecord | IncomeRecord | LiquidationRecord;

export type SessionRecord = {
    name: string,
    players: PersonRecord[],
    events: EventRecord[],
};
