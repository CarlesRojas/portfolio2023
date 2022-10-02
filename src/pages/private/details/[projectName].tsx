import type { GetServerSideProps, NextPage } from "next";
import s from "@styles/pages/Details.module.scss";
import { getServerAuthSession } from "@server/utils/get-server-auth-session";
import { RoutePaths } from "@interfaces/routes";
import { useRouter } from "next/router";
import { trpc } from "@server/utils/trpc";
import { FormEvent, useRef } from "react";
import useClickOutsideRef from "@hooks/useClickOutsideRef";
import { RiCloseLine } from "react-icons/ri";
import PrivateProjectInfo from "@components/PrivateProjectInfo";

export interface DetailsProps {
    projectName: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context;
    const { projectName } = query;
    const name = (projectName as string)?.split("_").join(" ");

    const session = await getServerAuthSession(context);
    if (!session)
        return { props: {}, redirect: { destination: `${RoutePaths.DETAILS}/${projectName}`, permanent: false } };

    return { props: { projectName: name } };
};

const PrivateDetails: NextPage<DetailsProps> = ({ projectName }) => {
    const router = useRouter();
    const { data: projectDetails } = trpc.useQuery(["public-get-project-details", { name: projectName }]);

    const sectionRef = useRef<HTMLFormElement>(null);
    useClickOutsideRef(sectionRef, () => router.push(RoutePaths.HOME));

    const saveProject = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const icon = (event.currentTarget.elements.namedItem("icon") as HTMLInputElement)?.files;
        const name = (event.currentTarget.elements.namedItem("name") as HTMLInputElement)?.value;
        const subtitle = (event.currentTarget.elements.namedItem("subtitle") as HTMLInputElement)?.value;

        console.log(icon);
        console.log(name);
        console.log(subtitle);
    };

    return (
        <main className={s.details}>
            <form ref={sectionRef} onSubmit={saveProject}>
                <button className={s.close} onClick={() => router.push(RoutePaths.HOME)} type="button">
                    <RiCloseLine />
                </button>

                <div className={s.scroll}>
                    {projectDetails && <PrivateProjectInfo projectDetails={projectDetails} />}
                </div>
            </form>
        </main>
    );
};

export default PrivateDetails;
