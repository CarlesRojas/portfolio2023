import type { NextPage } from "next";
import s from "@styles/pages/Home.module.scss";
import Hero from "@components/Hero";
import useWindowSize from "@hooks/useWindowSize";
import { trpc } from "@server/utils/trpc";
import Section from "@components/Section";
import { DESKTOP_THRESHOLD } from "@interfaces/constants";
// import useDidMount from "@hooks/useDidMount";

const Home: NextPage = () => {
    const { data: sections } = trpc.useQuery(["public-get-sections"]);
    // const { mutate } = trpc.useMutation(["private-create-project"]);

    const { width, height } = useWindowSize();
    const lateralHero = width > height && width >= DESKTOP_THRESHOLD;

    // useDidMount(() => {
    //     mutate({
    //         name: "Delete4",
    //         position: 0,
    //         poster: "https://portfoliomedia.s3.eu-west-1.amazonaws.com/poster.jpg",
    //         icon: "",
    //         subtitle: "",
    //         description: [""],
    //         technicalDescription: "",
    //         links: [""],
    //         video: "",
    //         videoPosition: 0,
    //         screenshots: [""],
    //         landscape: true,
    //         qrCode: "",
    //         sectionName: "Product Design",
    //     });
    // });

    return (
        <main className={s.home}>
            {lateralHero && <Hero header footer />}
            {!lateralHero && <Hero header />}

            <div className={s.content}>
                {sections?.map((section) => (
                    <Section key={section.name} section={section} />
                ))}
            </div>

            {!lateralHero && <Hero footer />}
        </main>
    );
};

export default Home;
