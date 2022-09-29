import type { GetServerSideProps, NextPage } from "next";
import s from "@styles/pages/Details.module.scss";
import { getServerAuthSession } from "@server/utils/get-server-auth-session";
import { RoutePaths } from "@interfaces/routes";
import { useRouter } from "next/router";
// import useDidMount from "@hooks/useDidMount";

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
    console.log(projectName);

    return <main className={s.details}>{projectName}</main>;
};

export default PrivateDetails;
