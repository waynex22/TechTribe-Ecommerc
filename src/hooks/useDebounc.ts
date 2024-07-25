import { useEffect, useState } from "react";

const useDebounc = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[value])
    return debouncedValue;
}

export default useDebounc;