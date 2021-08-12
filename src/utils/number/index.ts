export function covertDecimalToPercent(decimal: number) {
    let badPercent = String(decimal * 100);
    return badPercent.includes('.') ? badPercent.split('.')[0] : badPercent;
}
