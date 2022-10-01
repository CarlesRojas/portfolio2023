import { motion, AnimatePresence, Variant, Variants } from "framer-motion";
import { useRouter } from "next/router";
import s from "@styles/components/Transition.module.scss";
import { RoutePaths } from "@interfaces/routes";
import { isMobile } from "react-device-detect";
import { useEffect, useState } from "react";

type TransitionProps = { children: JSX.Element };

const opacityVariant: Variants = {
    out: { opacity: 0, y: 0, transition: { duration: 0.2, ease: "easeInOut" } },
    inactive: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeInOut" } },
    in: { opacity: 0, y: 0, transition: { duration: 0.2, ease: "easeInOut" } },
};

const translationVariant: Variants = {
    out: { opacity: 0, y: "25vh", transition: { duration: 0.2, ease: "easeInOut" } },
    inactive: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeInOut" } },
    in: { opacity: 0, y: "25vh", transition: { duration: 0.2, ease: "easeInOut" } },
};

const mobileVariant: Variants = {
    out: { opacity: 1 },
    inactive: { opacity: 1 },
    in: { opacity: 1 },
};

const opacityVariants: string[] = [RoutePaths.HOME, RoutePaths.PRIVATE_HOME, RoutePaths.LOGIN];

const Transition = ({ children }: TransitionProps) => {
    const router = useRouter();
    const { asPath } = router;

    const [variant, setVariant] = useState(opacityVariants.includes(asPath) ? opacityVariant : translationVariant);

    useEffect(() => {
        console.log(isMobile);
        if (isMobile) setVariant(mobileVariant);
    }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                className={s.transition}
                key={asPath}
                variants={variant}
                initial="in"
                animate="inactive"
                exit="out"
            >
                <div className={s.container}>{children}</div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Transition;
