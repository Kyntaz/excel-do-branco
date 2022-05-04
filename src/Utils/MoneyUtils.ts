export function roundToCents(value: number) {
    return Math.round((Math.abs(value) + Number.EPSILON) * 100) / 100;
}