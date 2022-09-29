import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import s from "@styles/components/Transition.module.scss";
import { RoutePaths } from "@interfaces/routes";

type TransitionProps = { children: JSX.Element };

const opacityVariant = {
    out: { opacity: 0, y: 0, transition: { duration: 0.2, ease: "easeInOut" } },
    inactive: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeInOut" } },
    in: { opacity: 0, y: 0, transition: { duration: 0.2, ease: "easeInOut" } },
};

const translationVariant = {
    out: { opacity: 0, y: "25vh", transition: { duration: 0.2, ease: "easeInOut" } },
    inactive: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeInOut" } },
    in: { opacity: 0, y: "25vh", transition: { duration: 0.2, ease: "easeInOut" } },
};

const opacityVariants: string[] = [RoutePaths.HOME, RoutePaths.PRIVATE_HOME, RoutePaths.LOGIN];

const Transition = ({ children }: TransitionProps) => {
    const router = useRouter();
    const { asPath } = router;

    const variant = opacityVariants.includes(asPath) ? opacityVariant : translationVariant;

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
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default Transition;
