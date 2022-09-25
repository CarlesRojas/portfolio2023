import { useState } from "react";
import useResize from "./useResize";

export default function useWindowSize() {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useResize(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
    }, true);

    return size;
}
