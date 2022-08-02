import { IDatesRate } from "../types/types";
import { getDateString } from "./getDateString";

export const getPrevScore = (datesRate: IDatesRate): number => {
    const today = new Date().getTime();
    const yesterdayString = getDateString(new Date(today - (24 * 60 * 60 * 1000)));
    const prevScore = datesRate[yesterdayString];
    return prevScore ? prevScore : 0;
}