
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Checking database connection...');
        const userCount = await prisma.user.count();
        console.log(`User count: ${userCount}`);

        const profileCount = await prisma.profile.count();
        console.log(`Profile count: ${profileCount}`);

        if (profileCount > 0) {
            const profile = await prisma.profile.findFirst();
            console.log('GITHUB_URL: ' + profile.githubUrl);
        }

        const projectCount = await prisma.project.count();
        console.log(`Project count: ${projectCount}`);

        if (projectCount > 0) {
            const projects = await prisma.project.findMany();
            console.log('Projects:', projects);
        }

    } catch (e) {
        console.error('Error connecting to database:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
