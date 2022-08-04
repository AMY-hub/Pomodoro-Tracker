import { ReactComponent as Arrow } from '../../asserts/Icons/arrow.svg';

import './index.scss';

interface ITimeSetterProps {
    name: 'Work' | 'Rest';
    timeParam: number;
    setTimeParam: React.Dispatch<React.SetStateAction<number>>;
}

export const TimeSettter: React.FC<ITimeSetterProps> = ({ name, timeParam, setTimeParam }) => {

    const handleTimesetting = (param: 'increase' | 'decrease') => {
        if (param === 'increase') {
            setTimeParam(prev => prev > 240 ? prev : prev + 1);
        }
        if (param === 'decrease') {
            setTimeParam(prev => prev > 1 ? prev - 1 : prev);
        }
    }

    return (
        <div className={`time-setter ${name === 'Work' ? 'work' : 'rest'}`}>
            <span>{`${name} time:`}</span>
            <div className='time__field'>
                {timeParam}
                <span className='time-setter__btns'>
                    <button
                        className='time-setter__btn'
                        onClick={() => handleTimesetting('increase')}
                    >
                        <Arrow
                            title='increase'
                            className='increase-arr' />
                    </button>
                    <button
                        className='time-setter__btn'
                        onClick={() => handleTimesetting('decrease')}>
                        <Arrow
                            title='decrease'
                            className='decrease-arr' />
                    </button>
                </span>
            </div>

            <span>min</span>
        </div>

    )
}
