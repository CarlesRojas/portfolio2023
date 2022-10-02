import useObservableList from "@hooks/useObservableList";
import useWindowSize from "@hooks/useWindowSize";
import { DESKTOP_THRESHOLD, TABLET_THRESHOLD } from "@interfaces/constants";
import { Project, Section } from "@prisma/client";
import s from "@styles/components/Section.module.scss";
import { useEffect, useRef } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import ProjectCard from "./ProjectCard";
import SectionTitle from "./SectionTitle";
import { useAutoAnimate } from "@formkit/auto-animate/react";

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

    const [parent] = useAutoAnimate<HTMLUListElement>();

    return (
        <div className={s.section}>
            <SectionTitle section={section} numberOfSections={numberOfSections} />

            <div className={`${s.slider} ${section.visible ? "" : s.notVisible}`}>
                <div className={s.scrollContainer} ref={containerRef}>
                    <ul ref={parent}>
                        {section.projects.map((project, i) => (
                            <li key={project.name} ref={(elem) => (projects.current[i] = elem)}>
                                <ProjectCard project={project} numberOfProjects={section.projects.length} />
                            </li>
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
