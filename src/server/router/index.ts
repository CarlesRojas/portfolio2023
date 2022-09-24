// src/server/router/index.ts
import { createRouter } from "@server/utils/context";
import superjson from "superjson";
import { publicRouter } from "@server/router/public-router";
import { privateRouter } from "@server/router/private-router";

export const appRouter = createRouter()
    .transformer(superjson)
    .merge("public-", publicRouter)
    .merge("private-", privateRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
