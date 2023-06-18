import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from 'bcrypt';

type SeedData = {
    users: {
        email: string;
        password: string;
        nftId: number;
    }[]
    nfts: {
        id: number;
        name: string;
    }[]
};

async function main()
{
    const data:SeedData = require('../seed-data.json')
    
    for (const nft of data.nfts)
    {
        await prisma.nFT.upsert({
            where: { id: nft.id },
            update: {},
            create: {
                id: nft.id,
                name: nft.name,
            },
        });
    }

    for (const user of data.users)
    {
        await prisma.user.upsert({
            where: { email: user.email },
            update: {},
            create: {
                email: user.email,
                password: await bcrypt.hash(user.password, 10),
                nftId: user.nftId,
            },
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })