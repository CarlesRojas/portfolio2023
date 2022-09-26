import { Project, Section } from "@prisma/client";
import s from "@styles/components/SectionTitle.module.scss";
import { SessionStatus } from "@interfaces/session";
import { useSession } from "next-auth/react";
import { RiArrowDownLine, RiArrowUpLine, RiEdit2Fill, RiEyeFill, RiEyeOffFill, RiSendPlane2Fill } from "react-icons/ri";
import Controls from "./Controls";
import { trpc } from "@server/utils/trpc";
import { FormEvent, useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import { useAtom } from "jotai";
import { isLoadingAtom } from "@context/index";

interface SectionTitleProps {
    section: Section;
    numberOfSections: number;
}

const SectionTitle = ({ section, numberOfSections }: SectionTitleProps) => {
    const { status } = useSession();

    const trpcContext = trpc.useContext();

    const { mutate: updateSection, isLoading: updatingSection } = trpc.useMutation(["private-update-section"], {
        onMutate: async (params) => {
            await trpcContext.cancelQuery(["private-get-sections"]);
            const prevSections = trpcContext.getQueryData(["private-get-sections"]);

            if (prevSections) {
                const newSections = cloneDeep(prevSections);

                for (let i = 0; i < newSections.length; i++) {
                    const element = newSections[i];
                    if (element && element.name === params.originalName) {
                        newSections[i] = { ...newSections[i], ...params } as Section & { projects: Project[] };
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

    const { mutate: moveSection, isLoading: movingSection } = trpc.useMutation(["private-move-section"], {
        onMutate: async (params) => {
            await trpcContext.cancelQuery(["private-get-sections"]);
            const prevSections = trpcContext.getQueryData(["private-get-sections"]);

            if (prevSections) {
                const newSections = cloneDeep(prevSections);

                let currIndex = -1;
                let newIndex = -1;

                for (let i = 0; i < newSections.length; i++) {
                    const element = newSections[i];
                    if (element && element.name === params.name) {
                        currIndex = i;
                        break;
                    }
                }

                newIndex = currIndex + (params.down ? 1 : -1);

                if (currIndex < newSections.length && newIndex < newSections.length) {
                    const aux = { ...newSections[currIndex], position: newIndex } as Section & { projects: Project[] };
                    newSections[currIndex] = { ...newSections[newIndex], position: currIndex } as Section & {
                        projects: Project[];
                    };
                    newSections[newIndex] = aux;
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

    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

    useEffect(() => {
        setIsLoading(updatingSection || movingSection);
    }, [updatingSection, movingSection, setIsLoading]);

    const onShowHide = () => {
        updateSection({ ...section, originalName: section.name, visible: !section.visible });
    };

    const onMoveDown = () => {
        moveSection({ name: section.name, position: section.position, down: true });
    };

    const onMoveUp = () => {
        moveSection({ name: section.name, position: section.position, down: false });
    };

    const [renaming, setRenaming] = useState(false);
    const [newName, setNewName] = useState(section.name);

    const rename = (event?: FormEvent) => {
        if (event) event.preventDefault();

        if (renaming) {
            setRenaming(false);
            if (newName !== section.name) updateSection({ ...section, originalName: section.name, name: newName });
        } else setRenaming(true);
    };

    const controls = [
        { icon: renaming ? <RiSendPlane2Fill /> : <RiEdit2Fill />, onClick: rename, disabled: isLoading },
        {
            icon: <RiArrowDownLine />,
            onClick: onMoveDown,
            disabled: isLoading || section.position >= numberOfSections - 1,
        },
        { icon: <RiArrowUpLine />, onClick: onMoveUp, disabled: isLoading || section.position <= 0 },
        { icon: section.visible ? <RiEyeOffFill /> : <RiEyeFill />, onClick: onShowHide, disabled: isLoading },
    ];

    return (
        <div className={s.sectionTitle}>
            {!renaming && <h1 className={`${section.visible ? "" : s.notVisible}`}>{section.name}</h1>}

            {status === SessionStatus.AUTHENTICATED && renaming && (
                <form onSubmit={rename}>
                    <input value={newName} onChange={(event) => setNewName(event.target.value)} />
                </form>
            )}

            {status === SessionStatus.AUTHENTICATED && (
                <div className={s.controls}>
                    <Controls controls={controls} />
                </div>
            )}
        </div>
    );
};

export default SectionTitle;
