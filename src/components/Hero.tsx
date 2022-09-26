import s from "@styles/components/Hero.module.scss";
import ProfilePicture from "@resources/profile/Profile.png";
import Image from "next/future/image";
import { useEffect } from "react";
import useAutoResetState from "@hooks/useAutoResetState";
import { useRouter } from "next/router";
import { RoutePaths } from "@interfaces/routes";
import { RiGithubFill, RiLinkedinFill, RiMailFill } from "react-icons/ri";

interface HeroProps {
    header?: boolean;
    footer?: boolean;
}

const Hero = ({ header, footer }: HeroProps) => {
    const router = useRouter();

    const [profileClicks, setProfileClicks] = useAutoResetState(0, 500);
    const onProfileClick = () => {
        setProfileClicks((prev: number) => Math.min(10, prev + 1));
    };
    useEffect(() => {
        if (profileClicks >= 10) router.push(RoutePaths.LOGIN);
    }, [profileClicks, router]);

    return (
        <div className={`${s.hero} ${!header || !footer ? s.fitContent : ""} ${header && footer ? s.lateralHero : ""}`}>
            <div className={s.card}>
                {header && (
                    <header onClick={onProfileClick}>
                        <Image src={ProfilePicture} alt="profile picture" priority />
                        <small>{"Hi"}</small>
                        <h1>{"I'm Carles Rojas"}</h1>
                        <h2>{"Software Engineer & Designer from Barcelona"}</h2>
                    </header>
                )}

                {footer && (
                    <footer>
                        <a href="https://www.linkedin.com/in/carles-rojas/" target="_blank" rel="noopener noreferrer">
                            <RiLinkedinFill />
                        </a>

                        <a href="https://github.com/CarlesRojas" target="_blank" rel="noopener noreferrer">
                            <RiGithubFill />
                        </a>

                        <a href="mailto:carlesrojas@outlook.com" target="_blank" rel="noopener noreferrer">
                            <RiMailFill />
                        </a>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default Hero;
