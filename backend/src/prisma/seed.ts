import { PrismaService } from "../prisma.service.js"
import { hashPassword } from "../utils/hashing.js";

const main = async () => {
    const prisma = new PrismaService();
    await prisma.user.createMany({
        data: [
            {
                name: "User 1",
                email: "user1@gmail.com",
                password: hashPassword('123456'),
                type: 'ADMIN',
                status: "ACTIVE"
            },
            {
                name: "User 2",
                email: "user2@gmail.com",
                password: hashPassword('123456'),
                type: 'STAFF',
                status: "ACTIVE"
            },
            {
                name: "User 3",
                email: "user3@gmail.com",
                password: hashPassword('123456'),
                type: 'CLIENT',
                status: "ACTIVE"
            }
        ]
    })
}

main().then(() => {
    console.log('success');
    process.exit();
}).catch(err => {
    console.log(`error`, err);
    process.exit();
})