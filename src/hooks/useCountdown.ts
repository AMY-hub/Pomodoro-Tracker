import { useEffect, useRef, useState } from "react";

type UseCountdown = (
    workMS: number,
    restMS: number,
    notification?: HTMLAudioElement) => [
        timeLeft: number,
        toggleTimer: () => void,
        resetTimer: () => void,
        currentPeriod: 'work' | 'rest',
        isRUnning: boolean
    ];

export const useCountdown: UseCountdown = (workMS, restMS, notification) => {

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
                        notification?.play();
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

    return [timeLeft, toggleTimer, resetTimer, currentPeriod, isRunning];
}