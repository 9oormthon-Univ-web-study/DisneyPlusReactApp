import { useEffect, useState } from 'react';

const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(handler); //이전에 있던 나머지 타이머들을 없애주기 위해서 clean-up
        };
    }, [value, delay]);

    return debounceValue;
};

export default useDebounce;
