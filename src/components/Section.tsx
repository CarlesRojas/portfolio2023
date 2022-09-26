import useObservableList from "@hooks/useObservableList";
import useWindowSize from "@hooks/useWindowSize";
import { DESKTOP_THRESHOLD, TABLET_THRESHOLD } from "@interfaces/constants";
import { Project, Section } from "@prisma/client";
import s from "@styles/components/Section.module.scss";
import { getProjectRoute } from "@utils/getProjectRoute";
import Image from "next/future/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import SectionTitle from "./SectionTitle";

interface SectionProps {
    section: Section & {
        projects: Project[];
    };
    numberOfSections: number;
}

const Section = ({ section, numberOfSections }: SectionProps) => {
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

    const projects = useRef<(HTMLLIElement | null)[]>(new Array(section.projects.length));
    const { allVisible, firstVisible, lastVisible, maxVisible } = useObservableList(containerRef, projects);

    // Has to be the same as --gap in @styles/components/Section.module.scss
    const getPadding = () => {
        const width = containerRef.current?.getBoundingClientRect().width || 0;
        return width < TABLET_THRESHOLD ? 16 : width < DESKTOP_THRESHOLD ? 16 * 3 : Math.min(width * 0.035, 16 * 4);
    };

    const onScrollButtonClicked = (showNext: boolean) => {
        const newFirstIndex = showNext
            ? Math.min(section.projects.length - 1, lastVisible + 1)
            : Math.max(0, firstVisible - maxVisible);

        const newFirstProject = projects.current[newFirstIndex];

        if (newFirstProject) {
            const padding = getPadding();
            const position = newFirstProject.offsetLeft - padding;
            containerRef.current?.scrollTo({ left: position, behavior: "smooth" });
        }
    };

    return (
        <div className={`${s.section} ${section.visible ? "" : s.notVisible}`}>
            <SectionTitle section={section} numberOfSections={numberOfSections} />

            <div className={s.slider}>
                <div className={s.scrollContainer} ref={containerRef}>
                    <ul>
                        {section.projects.map((project, i) => (
                            <Link key={project.name} href={getProjectRoute(project.name)}>
                                <li ref={(elem) => (projects.current[i] = elem)}>
                                    <Image
                                        src={project.poster}
                                        alt={`${project.name} poster image`}
                                        fill
                                        priority
                                        sizes="(max-width: 768px) 88vw, (max-width: 1200px) 42vw, (orientation: landscape) calc(18vh * 1.77777), 30vw"
                                    />
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>

                <div className={`${s.scrollButtons} ${allVisible ? s.hidden : ""}`}>
                    <button
                        className={`${firstVisible <= 0 ? s.disable : ""}`}
                        onClick={() => onScrollButtonClicked(false)}
                    >
                        <RiArrowLeftSLine />
                    </button>

                    <button
                        className={`${lastVisible >= section.projects.length - 1 ? s.disable : ""}`}
                        onClick={() => onScrollButtonClicked(true)}
                    >
                        <RiArrowRightSLine />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Section;
