import { MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
import useResize from "./useResize";

const getElementIndex = (element: Element) => {
    let i = 0;
    let current: Element | null = element;
    for (i = 0; current; i++) current = current.previousElementSibling;
    return i - 1;
};

export default function useObservableList(
    containerRef: RefObject<Element>,
    listElementsRef: MutableRefObject<(Element | null)[]>
) {
    const visibleElements = useRef(new Array(listElementsRef.current.length).fill(false));

    const [allVisible, setAllVisible] = useState(false);
    const [firstVisible, setFirstVisible] = useState(0);
    const [lastVisible, setLastVisible] = useState(0);
    const [maxVisible, setMaxVisible] = useState(1);

    const onImageVisible = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
            const index = getElementIndex(entry.target);
            visibleElements.current[index] = entry.isIntersecting;
        });

        setMaxVisible((prev) => Math.max(prev, visibleElements.current.filter((e) => e).length));
        setFirstVisible(visibleElements.current.indexOf(true));
        setLastVisible(visibleElements.current.lastIndexOf(true));
        setAllVisible(visibleElements.current.reduce((a, b) => a && b, true));
    };

    useResize(() => {
        setMaxVisible(-1);
        onImageVisible([]);
    });

    const observer = useRef<IntersectionObserver>();
    useEffect(() => {
        if (observer.current) return;

        observer.current = new IntersectionObserver(onImageVisible, {
            root: containerRef.current,
            threshold: 1,
        });

        listElementsRef.current.forEach((listElement) => {
            if (listElement) observer.current?.observe(listElement);
        });
    }, [containerRef, listElementsRef]);

    return { visibleElements, maxVisible, allVisible, firstVisible, lastVisible };
}
