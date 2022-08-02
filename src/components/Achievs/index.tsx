import { useMemo } from 'react';

import { getBestScore } from '../../utils/getBestScore';
import { getPrevScore } from '../../utils/getPrevScore';
import { IDatesRate } from '../../types/types';

import './index.scss';

interface IAchievsProps {
    datesRate: IDatesRate,
    today: string
}

export const Achievs: React.FC<IAchievsProps> = ({ datesRate, today }) => {

    const todayWorkTime = datesRate[today] ? datesRate[today] : 0;
    const prevScore = useMemo(() => getPrevScore(datesRate), [datesRate]);
    const prevTodayDifference = todayWorkTime - prevScore;
    const bestScore = useMemo(() => getBestScore(datesRate), [datesRate]);

    return (
        <section className="achievs">
            <ul className='achievs__list'>
                <li>
                    Today You’ve been focused <span className='accent'>{todayWorkTime}</span> min.
                </li>
                <li>
                    {`It’s `}
                    <span className='accent'>
                        {Math.abs(prevTodayDifference)}
                    </span>
                    {` min. ${prevTodayDifference > 0 ? 'greater' : 'less'} then yesterday!`}
                </li>
                <li>
                    You’ve been training your focus
                    for <span className='accent'>
                        {Object.keys(datesRate).length}
                    </span> days now
                </li>
                <li>
                    You best score is
                    <span className='accent'>{` ${bestScore} `}</span>
                    min. focus per day.
                </li>
            </ul>
            <p className='accent'>Keep going on!</p>
        </section>
    )
}
