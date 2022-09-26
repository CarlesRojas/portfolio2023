import { isLoadingAtom } from "@context/index";
import { SessionStatus } from "@interfaces/session";
import { Project } from "@prisma/client";
import { trpc } from "@server/utils/trpc";
import s from "@styles/components/ProjectCard.module.scss";
import { getProjectRoute } from "@utils/getProjectRoute";
import { useAtom } from "jotai";
import { cloneDeep } from "lodash";
import { useSession } from "next-auth/react";
import Image from "next/future/image";
import Link from "next/link";
import { useEffect } from "react";
import { RiArrowRightLine, RiArrowLeftLine, RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import Controls from "./Controls";

interface ProjectCardProps {
    project: Project;
    numberOfProjects: number;
}

const ProjectCard = ({ project, numberOfProjects }: ProjectCardProps) => {
    const { status } = useSession();

    const trpcContext = trpc.useContext();

    const { mutate: updateProject, isLoading: updatingProject } = trpc.useMutation(["private-update-project"], {
        onMutate: async (params) => {
            await trpcContext.cancelQuery(["private-get-sections"]);
            const prevSections = trpcContext.getQueryData(["private-get-sections"]);

            if (prevSections) {
                const newSections = cloneDeep(prevSections);

                for (let i = 0; i < newSections.length; i++) {
                    const element = newSections[i];

                    if (element && element.name === params.sectionName) {
                        for (let j = 0; j < element.projects.length; j++) {
                            const projectElement = element.projects[j];
                            if (projectElement && projectElement.name === params.originalName) {
                                element.projects[j] = { ...element.projects[j], ...params } as Project;
                                break;
                            }
                        }

                        break;
                    }
                }

                trpcContext.setQueryData(["private-get-sections"], newSections);
            }

            return { prevSections: prevSections || [] };
        },
        onError: (_error, _value, context) => {
            if (context) trpcContext.setQueryData(["private-get-sections"], context.prevSections);
        },
        onSettled: () => {
            trpcContext.invalidateQueries(["private-get-sections"]);
        },
    });

    // TODO move project
    // const { mutate: moveSection, isLoading: movingSection } = trpc.useMutation(["private-move-project"], {
    //     onMutate: async (params) => {
    //         await trpcContext.cancelQuery(["private-get-sections"]);
    //         const prevSections = trpcContext.getQueryData(["private-get-sections"]);

    //         if (prevSections) {
    //             const newSections = cloneDeep(prevSections);

    //             let currIndex = -1;
    //             let newIndex = -1;

    //             for (let i = 0; i < newSections.length; i++) {
    //                 const element = newSections[i];
    //                 if (element && element.name === params.name) {
    //                     currIndex = i;
    //                     break;
    //                 }
    //             }

    //             newIndex = currIndex + (params.down ? 1 : -1);

    //             if (currIndex < newSections.length && newIndex < newSections.length) {
    //                 const aux = { ...newSections[currIndex], position: newIndex } as Section & { projects: Project[] };
    //                 newSections[currIndex] = { ...newSections[newIndex], position: currIndex } as Section & {
    //                     projects: Project[];
    //                 };
    //                 newSections[newIndex] = aux;
    //             }

    //             trpcContext.setQueryData(["private-get-sections"], newSections);
    //         }

    //         return { prevSections: prevSections || [] };
    //     },
    //     onError: (_error, _value, context) => {
    //         if (context) trpcContext.setQueryData(["private-get-sections"], context.prevSections);
    //     },
    //     onSettled: () => {
    //         trpcContext.invalidateQueries(["private-get-sections"]);
    //     },
    // });

    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

    // useEffect(() => {
    //     setIsLoading(updatingProject || movingSection);
    // }, [updatingProject, movingSection, setIsLoading]);

    useEffect(() => {
        setIsLoading(updatingProject);
    }, [updatingProject, setIsLoading]);

    const onShowHide = () => {
        updateProject({ ...project, originalName: project.name, visible: !project.visible });
    };

    const onMoveRight = () => {
        // moveSection({ ...project, right: true });
    };

    const onMoveLeft = () => {
        // moveSection({ ...project, right: false });
    };

    const controls = [
        { icon: <RiArrowLeftLine />, onClick: onMoveLeft, disabled: isLoading || project.position <= 0 },
        {
            icon: <RiArrowRightLine />,
            onClick: onMoveRight,
            disabled: isLoading || project.position >= numberOfProjects - 1,
        },
        { icon: project.visible ? <RiEyeOffFill /> : <RiEyeFill />, onClick: onShowHide, disabled: isLoading },
    ];

    return (
        <div className={s.projectCard}>
            <Link href={getProjectRoute(project.name)}>
                <div className={`${s.imageContainer} ${project.visible ? "" : s.notVisible}`}>
                    <Image
                        src={project.poster}
                        alt={`${project.name} poster image`}
                        fill
                        priority
                        sizes="(max-width: 768px) 88vw, (max-width: 1200px) 42vw, (orientation: landscape) calc(18vh * 1.77777), 30vw"
                    />
                </div>
            </Link>

            {status === SessionStatus.AUTHENTICATED && (
                <div className={s.controls}>
                    <Controls controls={controls} />
                </div>
            )}
        </div>
    );
};

export default ProjectCard;
