import { formatNum } from '../../utils/formatNumber';

import './index.scss';

interface ITimeProps {
    min: number;
    sec: number;
    toggleTimer: () => void;
    resetTimer: () => void;
}

export const TimeControl: React.FC<ITimeProps> = ({ min, sec, toggleTimer, resetTimer }) => {
    return (
        <>
            <div className="time">
                <span className='min'>{formatNum(min)}</span>
                :
                <span className='sec'>{formatNum(sec)}</span>
            </div>
            <button className='time__toggle'
                onClick={toggleTimer}
            >start</button>
            <button className='time__reset'
                onClick={resetTimer}
            >reset</button>
        </>
    )
}
