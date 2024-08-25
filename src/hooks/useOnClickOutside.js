import React, { useEffect } from 'react';

const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (event) => {
            //ref에 아무것도 잡히지 않거나, `event.target`이 `ref.current`에 포함되지 않을 땐 return, 아니면 handler()호출
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler();
        };
        document.addEventListener('mousedown', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
        };
    }, [ref, handler]);
};

export default useOnClickOutside;
