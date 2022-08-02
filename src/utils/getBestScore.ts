import { IDatesRate } from "../types/types";

export const getBestScore = (datesRate: IDatesRate): number => {
    let max = 0;
    for (let key in datesRate) {
        if (datesRate[key] > max) {
            max = datesRate[key]
        }
    }
    return max;
}