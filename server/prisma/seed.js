import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const user = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: { password: hashedPassword },
        create: {
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'ADMIN',
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: 'monasri9c.vhs@gmail.com' },
        update: { password: hashedPassword }, // Ensure password is updated if user exists
        create: {
            email: 'monasri9c.vhs@gmail.com',
            password: hashedPassword,
            role: 'ADMIN',
        },
    });

    console.log({ user });

    const project = await prisma.project.create({
        data: {
            title: 'AI Portfolio',
            description: 'A full-stack portfolio website for AI students.',
            techStack: 'React, Node.js, Prisma, SQLite',
            category: 'Web Development',
            imageUrl: 'https://via.placeholder.com/150',
        },
    });

    console.log({ project });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
