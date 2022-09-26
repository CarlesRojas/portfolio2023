import { Project, Section } from "@prisma/client";
import s from "@styles/components/SectionTitle.module.scss";
import { SessionStatus } from "@interfaces/session";
import { useSession } from "next-auth/react";
import { RiArrowDownLine, RiArrowUpLine, RiEdit2Fill, RiEyeFill, RiEyeOffFill, RiSendPlane2Fill } from "react-icons/ri";
import Controls from "./Controls";
import { trpc } from "@server/utils/trpc";
import { FormEvent, useState } from "react";
import { cloneDeep } from "lodash";

interface SectionTitleProps {
    section: Section;
    numberOfSections: number;
}

const SectionTitle = ({ section, numberOfSections }: SectionTitleProps) => {
    const { status } = useSession();

    const trpcContext = trpc.useContext();
    const { mutate: updateSection } = trpc.useMutation(["private-update-section"], {
        onMutate: async (newSection) => {
            await trpcContext.cancelQuery(["private-get-sections"]);
            const prevSections = trpcContext.getQueryData(["private-get-sections"]);

            if (prevSections) {
                const newSections = cloneDeep(prevSections);

                for (let i = 0; i < newSections.length; i++) {
                    const element = newSections[i];
                    if (element && element.name === newSection.originalName) {
                        newSections[i] = { ...newSections[i], ...newSection } as Section & { projects: Project[] };
                        break;
                    }
                }

                newSections.sort((a, b) => a.position - b.position);
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

    const onShowHide = () => {
        updateSection({ ...section, originalName: section.name, visible: !section.visible });
    };

    const onMoveDown = () => {
        updateSection({ ...section, originalName: section.name });
        console.log("Move down");
    };

    const onMoveUp = () => {
        console.log("Move up");
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
        { icon: renaming ? <RiSendPlane2Fill /> : <RiEdit2Fill />, onClick: rename, disabled: false },
        { icon: section.visible ? <RiEyeFill /> : <RiEyeOffFill />, onClick: onShowHide, disabled: false },
        { icon: <RiArrowDownLine />, onClick: onMoveDown, disabled: section.position >= numberOfSections - 1 },
        { icon: <RiArrowUpLine />, onClick: onMoveUp, disabled: section.position <= 0 },
    ];

    return (
        <div className={s.sectionTitle}>
            {!renaming && <h1>{section.name}</h1>}

            {status === SessionStatus.AUTHENTICATED && renaming && (
                <form onSubmit={rename}>
                    <input value={newName} onChange={(event) => setNewName(event.target.value)} />
                </form>
            )}

            {status === SessionStatus.AUTHENTICATED && <Controls controls={controls} />}
        </div>
    );
};

export default SectionTitle;
