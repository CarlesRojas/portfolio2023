import type { NextPage } from "next";
import s from "@styles/pages/Home.module.scss";
import Hero from "@components/Hero";
import useWindowSize from "@hooks/useWindowSize";
import { trpc } from "@server/utils/trpc";

const DESKTOP_THRESHOLD = 1200;

const Home: NextPage = () => {
    const { data: sections } = trpc.useQuery(["public-get-sections"]);

    const { width, height } = useWindowSize();
    const lateralHero = width > height && width >= DESKTOP_THRESHOLD;

    console.log(sections);

    return (
        <main className={s.home}>
            {lateralHero && <Hero header footer />}

            {!lateralHero && (
                <>
                    <Hero header />
                    <Hero footer />
                </>
            )}
        </main>
    );
};

export default Home;
