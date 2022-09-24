import { prisma } from "@server/utils/client";
import { z } from "zod";
import { createProtectedRouter } from "@server/utils/context";

export const privateRouter = createProtectedRouter()
    .mutation("add-section", {
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
    .mutation("add-project", {
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
            qrCodeUrl: z.string().optional(),
            qrCodeImage: z.string().optional(),
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
                qrCodeUrl,
                qrCodeImage,
                sectionName,
            } = input;

            await prisma.project.upsert({
                where: { name },
                update: { name, poster, position, sectionName },
                create: { name, poster, position, sectionName },
            });

            if (qrCodeUrl && qrCodeImage)
                await prisma.qrCode.upsert({
                    where: { url: qrCodeUrl },
                    update: { url: qrCodeUrl, qr: qrCodeImage },
                    create: { url: qrCodeUrl, qr: qrCodeImage },
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
                    qrCodeUrl,
                },
            });
        },
    });
