import { Timer } from '../Timer';
import { TimeSettter } from '../TimeSetter';
import { Achievs } from '../Achievs';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import { getDateString } from '../../utils/getDateString';
import { IDatesRate } from '../../types/types';

import './index.scss';

export const MainLayout = () => {

    const today = getDateString(new Date());

    const [workTime, setWorkTime] = useLocalStorage<number>('PomodoroWorkTime', 25);
    const [restTime, setRestTime] = useLocalStorage<number>('PomodoroRestTime', 5);
    const [datesRate, setDatesRate] = useLocalStorage<IDatesRate>('PomodoroDaysRate', { [today]: 0 });

    return (
        <main className='main'>
            <div className='time-setters'>
                <TimeSettter
                    name='Work'
                    timeParam={workTime}
                    setTimeParam={setWorkTime}
                />
                <TimeSettter
                    name='Rest'
                    timeParam={restTime}
                    setTimeParam={setRestTime}
                />
            </div>
            <Timer
                workTime={workTime}
                restTime={restTime}
                setDatesRate={setDatesRate}
                today={today}
            />
            <Achievs
                datesRate={datesRate}
                today={today}
            />
        </main>
    )
}
