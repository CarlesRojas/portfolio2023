import type { NextPage } from "next";
import s from "@styles/pages/Home.module.scss";
import Hero from "@components/Hero";
import useWindowSize from "@hooks/useWindowSize";

const DESKTOP_THRESHOLD = 1200;

const Home: NextPage = () => {
    const { width, height } = useWindowSize();

    const lateralHero = width > height && width >= DESKTOP_THRESHOLD;
    console.log(width);

    return (
        <div className={s.home}>
            {lateralHero && <Hero header footer />}

            {!lateralHero && (
                <>
                    <Hero header />
                    <Hero footer />
                </>
            )}
        </div>
    );
};

export default Home;
