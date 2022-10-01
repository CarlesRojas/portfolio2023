import type { GetServerSideProps, NextPage } from "next";
import s from "@styles/pages/Details.module.scss";
import { getServerAuthSession } from "@server/utils/get-server-auth-session";
import { RoutePaths } from "@interfaces/routes";
import { RiCloseLine } from "react-icons/ri";
import { useRouter } from "next/router";
import useClickOutsideRef from "@hooks/useClickOutsideRef";
import { useRef } from "react";
import ProjectInfo from "@components/ProjectInfo";
import { trpc } from "@server/utils/trpc";

export interface DetailsProps {
    projectName: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context;
    const { projectName } = query;
    const name = (projectName as string)?.split("_").join(" ");

    const session = await getServerAuthSession(context);
    if (session)
        return {
            props: {},
            redirect: { destination: `${RoutePaths.PRIVATE_DETAILS}/${projectName}`, permanent: false },
        };

    return { props: { projectName: name } };
};

const Details: NextPage<DetailsProps> = ({ projectName }) => {
    const router = useRouter();
    const { data: projectDetails } = trpc.useQuery(["public-get-project-details", { name: projectName }]);

    const sectionRef = useRef<HTMLElement>(null);
    useClickOutsideRef(sectionRef, () => router.push(RoutePaths.HOME));

    return (
        <main className={s.details}>
            <section ref={sectionRef}>
                <button className={s.close} onClick={() => router.push(RoutePaths.HOME)}>
                    <RiCloseLine />
                </button>

                <div className={s.scroll}>{projectDetails && <ProjectInfo projectDetails={projectDetails} />}</div>
            </section>
        </main>
    );
};

export default Details;
