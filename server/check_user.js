import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const email = 'monasri9c.vhs@gmail.com';
    const user = await prisma.user.findUnique({
        where: { email },
    });

    console.log(`Checking user: ${email}`);
    if (user) {
        console.log('User found:', user);
        console.log('Password hash length:', user.password.length);
    } else {
        console.log('User NOT found');
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
