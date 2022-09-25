import type { NextPage } from "next";
import s from "@styles/pages/Home.module.scss";
import Hero from "@components/Hero";

const Home: NextPage = () => {
    return (
        <div className={s.home}>
            <Hero header footer />
            {/* <Hero footer /> */}
        </div>
    );
};

export default Home;
