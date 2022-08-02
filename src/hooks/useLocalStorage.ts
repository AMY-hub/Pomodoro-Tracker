import { useEffect, useState } from "react";

type useLS = <T>(key: string, initialValue: T) => [
    data: T,
    setData: React.Dispatch<React.SetStateAction<T>>
];

export const useLocalStorage: useLS = (key, initialValue) => {
    const getValue = (): typeof initialValue => {
        const data = localStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        } else {
            return initialValue;
        }
    }

    const [data, setData] = useState<typeof initialValue>(getValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(data));
    }, [data])

    return [data, setData];
}