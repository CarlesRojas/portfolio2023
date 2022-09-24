// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { env } from "@env/server.mjs";
import { appRouter } from "@server/infra/views";
import { createContext } from "@server/infra/views/utils/context";

// export API handler
export default createNextApiHandler({
    router: appRouter,
    createContext,
    onError:
        env.NODE_ENV === "development"
            ? ({ path, error }) => console.error(`❌ tRPC failed on ${path}: ${error}`)
            : undefined,
});
