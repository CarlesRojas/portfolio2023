import { prisma } from "@server/utils/client";
import { z } from "zod";
import { createProtectedRouter } from "@server/utils/context";

export const privateRouter = createProtectedRouter()
    .mutation("create-section", {
        input: z.object({
            name: z.string(),
            position: z.number(),
        }),
        async resolve({ input }) {
            const { name, position } = input;

            await prisma.section.upsert({
                where: { name },
                update: { name, position },
                create: { name, position },
            });
        },
    })
    .mutation("update-section", {
        input: z.object({
            originalName: z.string(),
            name: z.string().optional(),
            position: z.number(),
            visible: z.boolean(),
        }),
        async resolve({ input }) {
            const { originalName, name, position, visible } = input;

            await prisma.section.update({
                where: { name: originalName },
                data: { name: name || originalName, position, visible },
            });
        },
    })
    .mutation("delete-section", {
        input: z.object({ name: z.string() }),
        async resolve({ input }) {
            const { name } = input;

            await prisma.section.delete({ where: { name } });
        },
    })

    .mutation("create-project", {
        input: z.object({
            name: z.string(),
            position: z.number(),
            poster: z.string(),
            icon: z.string(),
            subtitle: z.string(),
            description: z.string().array(),
            technicalDescription: z.string(),
            links: z.string().array(),
            video: z.string().optional(),
            videoPosition: z.number().optional(),
            screenshots: z.string().array(),
            landscape: z.boolean(),
            qrCode: z.string().optional(),
            sectionName: z.string(),
        }),
        async resolve({ input }) {
            const {
                name,
                position,
                poster,
                icon,
                subtitle,
                description,
                technicalDescription,
                links,
                video,
                videoPosition,
                screenshots,
                landscape,
                qrCode,
                sectionName,
            } = input;

            await prisma.project.upsert({
                where: { name },
                update: { name, poster, position, sectionName },
                create: { name, poster, position, sectionName },
            });

            await prisma.projectDetails.upsert({
                where: { name },
                update: {
                    name,
                    poster,
                    icon,
                    subtitle,
                    description,
                    technicalDescription,
                    links,
                    video,
                    videoPosition,
                    screenshots,
                    landscape,
                    qrCode,
                },
                create: {
                    name,
                    poster,
                    icon,
                    subtitle,
                    description,
                    technicalDescription,
                    links,
                    video,
                    videoPosition,
                    screenshots,
                    landscape,
                    qrCode,
                },
            });
        },
    })
    .mutation("update-project", {
        input: z.object({
            originalName: z.string(),
            name: z.string(),
            position: z.number(),
            poster: z.string(),
            icon: z.string(),
            subtitle: z.string(),
            description: z.string().array(),
            technicalDescription: z.string(),
            links: z.string().array(),
            video: z.string().optional(),
            videoPosition: z.number().optional(),
            screenshots: z.string().array(),
            landscape: z.boolean(),
            qrCode: z.string().optional(),
            sectionName: z.string(),
        }),
        async resolve({ input }) {
            const {
                originalName,
                name,
                position,
                poster,
                icon,
                subtitle,
                description,
                technicalDescription,
                links,
                video,
                videoPosition,
                screenshots,
                landscape,
                qrCode,
                sectionName,
            } = input;

            await prisma.project.update({
                where: { name: originalName },
                data: { name, poster, position, sectionName },
            });

            await prisma.projectDetails.update({
                where: { name },
                data: {
                    name,
                    poster,
                    icon,
                    subtitle,
                    description,
                    technicalDescription,
                    links,
                    video,
                    videoPosition,
                    screenshots,
                    landscape,
                    qrCode,
                },
            });
        },
    })
    .mutation("delete-project", {
        input: z.object({ name: z.string() }),
        async resolve({ input }) {
            const { name } = input;

            await prisma.project.delete({ where: { name } });
        },
    });
