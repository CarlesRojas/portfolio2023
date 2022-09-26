import type { GetServerSideProps, NextPage } from "next";
import s from "@styles/pages/Home.module.scss";
import Hero from "@components/Hero";
import { trpc } from "@server/utils/trpc";
import Section from "@components/Section";
import { getServerAuthSession } from "@server/utils/get-server-auth-session";
import { RoutePaths } from "@interfaces/routes";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerAuthSession(context);
    if (!session) return { props: {}, redirect: { destination: RoutePaths.HOME, permanent: false } };
    return { props: {} };
};

const PrivateHome: NextPage = () => {
    const { data: sections } = trpc.useQuery(["private-get-sections"]);

    return (
        <main className={s.home}>
            <Hero header footer />
            <Hero header />

            <div className={s.content}>
                {sections?.map((section) => (
                    <Section key={section.name} section={section} numberOfSections={sections.length} />
                ))}
            </div>

            <Hero footer />
        </main>
    );
};

export default PrivateHome;
