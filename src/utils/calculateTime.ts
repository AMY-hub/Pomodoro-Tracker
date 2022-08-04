export function calculateTime(ms: number): [number, number] {
    const min = Math.floor(ms / (1000 * 60));
    const sec = Math.floor((ms % (1000 * 60)) / 1000);
    return [min, sec];
}