import { useEffect, useRef, useState } from "react";

type UseCountdown = (
    workMS: number,
    restMS: number,
    notification?: HTMLAudioElement) => [
        timeLeft: number,
        toggleTimer: () => void,
        resetTimer: () => void,
        currentPeriod: 'work' | 'rest',
        isRunning: boolean
    ];

export const useCountdown: UseCountdown = (workMS, restMS, notification) => {

    const [timeLeft, setTimeLeft] = useState(workMS);
    const [isRunning, setIsRunning] = useState(false);
    const [currentPeriod, setCurrentPeriod] = useState<'work' | 'rest'>('work');

    const intervalRef = useRef<NodeJS.Timer | null>(null);

    useEffect(() => {
        setTimeLeft(currentPeriod === 'work' ? workMS : restMS);
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            setIsRunning(false);
        }
    }, [workMS, restMS, currentPeriod]);

    const toggleTimer = () => {
        if (isRunning) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            return;
        }

        if (!isRunning) {
            setIsRunning(true);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            intervalRef.current = setInterval(() => {
                setTimeLeft((timeLeft) => {
                    const newTimeLeft = timeLeft - 1000;

                    if (newTimeLeft > 0) {
                        return newTimeLeft;
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
    };

    const resetTimer = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsRunning(false);
        setTimeLeft(currentPeriod === 'work' ? workMS : restMS);
    };

    return [timeLeft, toggleTimer, resetTimer, currentPeriod, isRunning];
};