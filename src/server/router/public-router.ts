import { prisma } from "@server/utils/client";
import { z } from "zod";
import { createRouter } from "@server/utils/context";

export const publicRouter = createRouter()
    .query("get-sections", {
        async resolve() {
            return await prisma.section.findMany({
                orderBy: { position: "asc" },
                include: { projects: { orderBy: { position: "asc" } } },
            });
        },
    })

    .query("get-project-details", {
        input: z.object({ name: z.string() }),
        async resolve({ input }) {
            const { name } = input;
            return await prisma.projectDetails.findUnique({ where: { name } });
        },
    });
