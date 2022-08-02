import { useEffect, useRef, useState } from "react";

type UseCountdown = (workMS: number, restMS: number) => [
    min: number,
    sec: number,
    toggleTimer: () => void,
    resetTimer: () => void,
    currentPeriod: 'work' | 'rest',
];

export const useCountdown: UseCountdown = (workMS, restMS) => {

    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [currentPeriod, setCurrentPeriod] = useState<'work' | 'rest'>('work');

    const intervalRef = useRef<NodeJS.Timer | null>(null);

    const toggleTimer = () => {
        if (isRunning) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            return;
        }

        if (!isRunning) {
            setIsRunning(true);
            if (intervalRef.current) clearInterval(intervalRef.current);

            intervalRef.current = setInterval(() => {
                setTimeLeft((timeLeft) => {
                    const newTime = timeLeft - 1000;
                    if (newTime > 0) {
                        return newTime;
                    } else {
                        setIsRunning(false);
                        clearInterval(intervalRef.current!);
                        setCurrentPeriod(currentPeriod === 'work' ? 'rest' : 'work');
                        return currentPeriod === 'work' ? restMS : workMS;
                    }
                })
            }, 1000)
        }
    }

    const resetTimer = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsRunning(false);
        setTimeLeft(currentPeriod === 'work' ? workMS : restMS);
    }

    useEffect(() => {
        setTimeLeft(currentPeriod === 'work' ? workMS : restMS);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsRunning(false);
        }
    }, [workMS, restMS])

    const [min, sec] = calculateTime(timeLeft);

    return [min, sec, toggleTimer, resetTimer, currentPeriod];
}

function calculateTime(ms: number): [number, number] {
    const min = Math.floor(ms / (1000 * 60));
    const sec = Math.floor((ms % (1000 * 60)) / 1000);
    return [min, sec];
}