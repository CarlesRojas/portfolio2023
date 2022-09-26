import type { NextPage } from "next";
import s from "@styles/pages/Home.module.scss";
import Hero from "@components/Hero";
import { trpc } from "@server/utils/trpc";
import Section from "@components/Section";
// import useDidMount from "@hooks/useDidMount";

const Home: NextPage = () => {
    const { data: sections } = trpc.useQuery(["public-get-sections"]);
    // const { mutate } = trpc.useMutation(["private-create-project"]);

    // useDidMount(() => {
    //     mutate({
    //         name: "Delete Game 6",
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
    //         sectionName: "Game Development",
    //     });
    // });

    return (
        <main className={s.home}>
            <Hero header footer />
            <Hero header />

            <div className={s.content}>
                {sections?.map((section) => (
                    <Section key={section.name} section={section} />
                ))}
            </div>

            <Hero footer />
        </main>
    );
};

export default Home;
