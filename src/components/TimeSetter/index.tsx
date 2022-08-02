import { useState } from 'react';

import './index.scss';

interface ITimeSetterProps {
    name: 'Work' | 'Rest';
    timeParam: number;
    setTimeParam: React.Dispatch<React.SetStateAction<number>>;
}

export const TimeSettter: React.FC<ITimeSetterProps> = ({ name, timeParam, setTimeParam }) => {

    const [invalidTime, setInvalidTime] = useState(false);

    const handleTimesetting = (time: number) => {
        if (!time || time < 0 || time > 1800) {
            setInvalidTime(true);
            return;
        } else {
            setInvalidTime(false);
            setTimeParam(time);
        }
    }

    return (
        <div className={'time-setter'}>
            <form className={`time-setter__form ${name === 'Work' ? 'work' : 'rest'}`}
            >
                <label htmlFor="time">{`${name} time:`}</label>
                <input
                    type='number'
                    id='time'
                    value={timeParam}
                    onChange={(e) => handleTimesetting(parseInt(e.target.value))}
                    step={1}
                    min={0}
                    max={1800}
                    className={invalidTime ? 'time-input invalid' : 'time-input'}
                />
                <span>min</span>
            </form>
            {invalidTime &&
                <span className='incorrect'>Incorrect data!</span>}
        </div>

    )
}
