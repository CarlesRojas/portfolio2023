import type { NextPage } from "next";
import s from "@styles/pages/Home.module.scss";
import Hero from "@components/Hero";
import useWindowSize from "@hooks/useWindowSize";

const DESKTOP_THRESHOLD = 1200;

const Home: NextPage = () => {
    const { width } = useWindowSize();

    return (
        <div className={s.home}>
            {width >= DESKTOP_THRESHOLD && <Hero header footer />}

            {width < DESKTOP_THRESHOLD && (
                <>
                    <Hero header />
                    <Hero footer />
                </>
            )}
        </div>
    );
};

export default Home;
