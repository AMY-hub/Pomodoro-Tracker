import { useEffect } from 'react';

import { TimeControl } from '../TimeControl';
import { ProgressBar } from '../ProgressBar';

import { useCountdown } from '../../hooks/useCountdown';
import { msecFromMinutes } from '../../utils/msecFromMinutes';
import { calculateTime } from '../../utils/calculateTime';

import { IDatesRate } from '../../types/types';

import timer from '../../asserts/Icons/timer.svg';
import sound from '../../asserts/audio/notification.mp3';

import './index.scss';

interface ITimerProps {
    workTime: number;
    restTime: number;
    setDatesRate: React.Dispatch<React.SetStateAction<IDatesRate>>;
    today: string;
}

export const Timer: React.FC<ITimerProps> = ({ workTime, restTime, setDatesRate, today }) => {

    const notification = new Audio(sound);
    const workTimeMS = msecFromMinutes(workTime);
    const restTimeMS = msecFromMinutes(restTime);

    const [
        timeLeft,
        toggleTimer,
        resetTimer,
        currentPeriod,
        isRunning
    ] = useCountdown(workTimeMS, restTimeMS, notification);

    const [min, sec] = calculateTime(timeLeft);

    useEffect(() => {
        if (currentPeriod === 'rest') {
            setDatesRate(prevRate => {
                return {
                    ...prevRate,
                    [today]: prevRate[today] ? prevRate[today] + workTime : workTime
                }
            })
        }
    }, [currentPeriod, setDatesRate, today, workTime]);

    return (
        <section className="timer">
            <div className="timer__face">
                <img src={timer} alt="pomodoro-timer" className='timer__img' />
                <div className="time-panel">
                    <ProgressBar
                        progress={currentPeriod === 'work' ?
                            (timeLeft * 100) / workTimeMS
                            : (timeLeft * 100) / restTimeMS}
                        shape='round'
                        size={window.innerWidth > 550 ? 250 : 215}
                        trackColor='#FF856A'
                        indicatorColor={currentPeriod === 'work' ? '#ffc257' : '#99AF7C'}
                        indicatorWidth={10}
                        trackWidth={10}
                    >
                        <TimeControl
                            min={min}
                            sec={sec}
                            toggleTimer={toggleTimer}
                            resetTimer={resetTimer}
                            isRunning={isRunning} />
                    </ProgressBar>
                </div>
            </div>
            {currentPeriod === 'rest' &&
                <p className="timer__warning hidden">
                    It’s time to take a break!</p>
            }
        </section>
    )
}
