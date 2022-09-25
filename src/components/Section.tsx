import useWindowSize from "@hooks/useWindowSize";
import { DESKTOP_THRESHOLD } from "@interfaces/constants";
import { Project, Section } from "@prisma/client";
import s from "@styles/components/Section.module.scss";
import Image from "next/future/image";
import { useCallback, useEffect, useRef } from "react";

interface SectionProps {
    section: Section & {
        projects: Project[];
    };
}

const Section = ({ section }: SectionProps) => {
    const { width, height } = useWindowSize();
    const lateralHero = width > height && width >= DESKTOP_THRESHOLD;

    const containerRef = useRef<HTMLDivElement>(null);
    const scroll = (event: WheelEvent) => {
        event.preventDefault();
        if (containerRef.current) containerRef.current.scrollLeft += event.deltaY;
    };
    useEffect(() => {
        const containerRefAux = containerRef.current;
        if (containerRefAux && lateralHero) containerRefAux.addEventListener("wheel", scroll, { passive: false });

        return () => {
            if (containerRefAux) containerRefAux.removeEventListener("wheel", scroll);
        };
    }, [lateralHero]);

    return (
        <div className={s.section}>
            <h1>{section.name}</h1>

            <div className={s.scrollContainer} ref={containerRef}>
                <ul>
                    {section.projects.map((project, i) => (
                        <li key={project.name}>
                            <Image
                                src={project.poster}
                                alt={`${project.name} poster image`}
                                fill
                                priority
                                sizes="(max-width: 768px) 88vw, (max-width: 1200px) 42vw, (orientation: landscape) calc(18vh * 1.77777), 30vw"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Section;
