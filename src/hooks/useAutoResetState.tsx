import { useEffect, useState } from "react";

export default function useAutoResetState(initialValue: any, durationInMilliseconds: number) {
    const [internalState, setInternalState] = useState(initialValue);

    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;
        if (internalState !== initialValue)
            timeout = setTimeout(() => setInternalState(initialValue), durationInMilliseconds);

        return () => {
            timeout && clearTimeout(timeout);
        };
    }, [durationInMilliseconds, initialValue, internalState]);

    return [internalState, setInternalState];
}
