import s from "@styles/components/Hero.module.scss";
import ProfilePicture from "@resources/profile/Profile.png";
import Image from "next/future/image";
import { useRef } from "react";
import Study, { StudyProps } from "./Study";

interface HeroProps {
    header?: boolean;
    footer?: boolean;
}

const Hero = ({ header, footer }: HeroProps) => {
    const studies = useRef<StudyProps[]>([
        {
            degreeTitle: "Bachelor's Degree in informatics Engineering",
            educationCenter: "Facultat d'Informàtica de Barcelona",
            years: "2015 - 2018",
        },
        {
            degreeTitle: "Bachelor's Degree in Product Design",
            educationCenter: "EINA Centre Universitari de Disseny i Art de Barcelona",
            years: "2011 - 2015",
        },
    ]);

    return (
        <div className={`${s.hero} ${!header || !footer ? s.fitContent : ""}`}>
            {header && (
                <header>
                    <Image src={ProfilePicture} alt="profile picture" priority />
                    <h1>{"Hi, I'm Carles Rojas"}</h1>
                    <h2>{"Software Engineer & Designer from Barcelona"}</h2>
                </header>
            )}

            {footer && (
                <footer style={{ gridTemplateRows: `repeat(${studies.current.length + 1}, 1fr)` }}>
                    {studies.current.map((study) => (
                        <Study key={study.degreeTitle} {...study} />
                    ))}

                    <div className={s.email}>
                        <button>{"carlesrojas@outlook.com"}</button>
                        <small>{"email copied"}</small>
                    </div>
                </footer>
            )}
        </div>
    );
};

export default Hero;
