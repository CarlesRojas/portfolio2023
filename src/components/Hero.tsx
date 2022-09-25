import s from "@styles/components/Hero.module.scss";
import ProfilePicture from "@resources/profile/Profile.png";
import Image from "next/future/image";
import { useEffect, useRef } from "react";
import Study, { StudyProps } from "./Study";
import useAutoResetState from "@hooks/useAutoResetState";
import { useRouter } from "next/router";
import { RoutePaths } from "@interfaces/routes";

interface HeroProps {
    header?: boolean;
    footer?: boolean;
}

const Hero = ({ header, footer }: HeroProps) => {
    const router = useRouter();

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

    const [emailCopied, setEmailCopied] = useAutoResetState(false, 3000);
    const onCopyEmail = () => {
        navigator.clipboard.writeText("carlesrojas@outlook.com");
        setEmailCopied(true);
    };

    const [profileClicks, setProfileClicks] = useAutoResetState(0, 500);
    const onProfileClick = () => {
        setProfileClicks((prev: number) => Math.min(10, prev + 1));
    };
    useEffect(() => {
        if (profileClicks >= 10) router.push(RoutePaths.LOGIN);
    }, [profileClicks, router]);

    return (
        <div className={`${s.hero} ${!header || !footer ? s.fitContent : ""}`}>
            {header && (
                <header>
                    <Image src={ProfilePicture} alt="profile picture" priority onClick={onProfileClick} />
                    <small>{"Hi"}</small>
                    <h1>{"I'm Carles Rojas"}</h1>
                    <h2>{"Software Engineer & Designer from Barcelona"}</h2>
                </header>
            )}

            {footer && (
                <footer style={{ gridTemplateRows: `repeat(${studies.current.length + 1}, 1fr)` }}>
                    {studies.current.map((study) => (
                        <Study key={study.degreeTitle} {...study} />
                    ))}

                    <div className={s.email}>
                        <button onClick={onCopyEmail}>{"carlesrojas@outlook.com"}</button>
                        <small className={emailCopied ? s.visible : ""}>{"email copied"}</small>
                    </div>
                </footer>
            )}
        </div>
    );
};

export default Hero;
