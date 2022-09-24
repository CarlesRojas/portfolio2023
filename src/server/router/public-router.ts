import { prisma } from "@server/utils/client";
import { z } from "zod";
import { createRouter } from "@server/utils/context";

export const publicRouter = createRouter();
