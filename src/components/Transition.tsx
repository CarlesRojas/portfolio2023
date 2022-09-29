import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import s from "@styles/components/Transition.module.scss";

type TransitionProps = { children: JSX.Element };

const variants = {
    inactive: { opacity: 1, y: 0, transition: { duration: 0.1, ease: "easeInOut" } },
    out: { opacity: 0, y: -50, transition: { duration: 0.1, ease: "easeInOut" } },
    in: { y: 50, opacity: 0, transition: { duration: 0.1, ease: "easeInOut" } },
};

const Transition = ({ children }: TransitionProps) => {
    const router = useRouter();
    const { asPath } = router;

    return (
        <AnimatePresence exitBeforeEnter>
            <motion.div
                className={s.transition}
                key={asPath}
                variants={variants}
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
