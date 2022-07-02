import { useCallback, useEffect, useState } from "react";


function useResize(elementRef) {
    const [size, setSize] = useState({width: 0, height: 0});

    const updateWidth = useCallback(() => {
        if(elementRef && elementRef.current) {
            const { width, height } = elementRef.current.getBoundingClientRect();
            setSize({width, height});
        }
    }, [elementRef]);

    useEffect(() => {
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => {
            window.removeEventListener('resize', updateWidth);
        }
    }, [elementRef, updateWidth])

    return [size];
}

export default useResize;