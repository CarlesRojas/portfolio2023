import { RoutePaths } from "@interfaces/routes";
import { getServerAuthSession } from "@server/utils/get-server-auth-session";
import s from "@styles/pages/Login.module.scss";
import type { GetServerSideProps, NextPage } from "next";
import { Provider } from "next-auth/providers";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/future/image";
import Link from "next/link";
import { RiGoogleFill } from "react-icons/ri";

interface LoginProps {
    providers: Provider[];
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const providers = await getProviders();
    const session = await getServerAuthSession({ req, res });

    if (session) return { redirect: { destination: RoutePaths.HOME, permanent: false } };
    return { props: { providers } };
};

const Login: NextPage<LoginProps> = (props) => {
    const { providers } = props;

    return (
        <main className={s.login}>
            <Image src="/logo.svg" alt="carles rojas logo" priority width="64" height="64" />

            {providers &&
                Object.values(providers).map((provider) => (
                    <button key={provider.name} onClick={() => signIn(provider.id)}>
                        <RiGoogleFill />
                        <p>{`Sign in with ${provider.name}`}</p>
                    </button>
                ))}

            <Link href={RoutePaths.HOME} scroll={false}>
                <a>back</a>
            </Link>
        </main>
    );
};

export default Login;
