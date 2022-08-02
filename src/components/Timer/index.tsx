import { useEffect } from 'react';

import { TimeControl } from '../TimeControl';

import { useCountdown } from '../../hooks/useCountdown';

import { msecFromMinutes } from '../../utils/msecFromMinutes';
import { IDatesRate } from '../../types/types';

import timer from '../../asserts/Icons/timer.svg';

import './index.scss';

interface ITimerProps {
    workTime: number;
    restTime: number;
    setDatesRate: React.Dispatch<React.SetStateAction<IDatesRate>>;
    today: string;
}

export const Timer: React.FC<ITimerProps> = ({ workTime, restTime, setDatesRate, today }) => {

    const [
        min,
        sec,
        toggleTimer,
        resetTimer,
        currentPeriod,
    ] = useCountdown(msecFromMinutes(workTime), msecFromMinutes(restTime));

    useEffect(() => {
        if (currentPeriod === 'rest') {
            setDatesRate(prevRate => {
                return {
                    ...prevRate,
                    [today]: prevRate[today] ? prevRate[today] + workTime : workTime
                }
            })
        }
    }, [currentPeriod]);

    return (
        <section className="timer">
            <div className="timer__face">
                <img src={timer} alt="pomodoro-timer" className='timer__img' />
                <div className="time-panel">
                    <TimeControl
                        min={min}
                        sec={sec}
                        toggleTimer={toggleTimer}
                        resetTimer={resetTimer} />
                </div>
            </div>
            {currentPeriod === 'rest' &&
                <p className="timer__warning hidden">
                    It’s time to take a break!</p>
            }
        </section>
    )
}
