import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import * as dotenv from 'dotenv'

dotenv.config()

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

// Передаємо адаптер у клієнт
const prisma = new PrismaClient({ adapter}) //log: ["query"] – to have details

async function main() {
    await prisma.users.deleteMany({})

    // CREATE



    const user1 = await prisma.users.create({
        data: {
            name: "Snekchyk",
            email: "snekchyk@gmail.com",
            age: 13,
            userPreference: {
                create: {
                    emailUpdates: true
                }
            }
        },
        // select: {
        //     name: true,
        //     age: true
        // } – will print only these stuff
        include: {
            userPreference: true,
        }
    })

    console.log(user1)


    const user2 = await prisma.users.createMany({
        data: [
            {
                name: "Nikita",
                email: "MykytaPlay@gmail.com",
                age: 13
            },
            {
                name: "Nikita",
                email: "Nikita@gmail.com",
                age: 15
            },
            {
                name: "Nikita",
                email: "Nikita2@gmail.com",
                age: 17
            }
        ]
    })

    console.log(user2)



    //FIND



    const user3 = await prisma.users.findUnique({
        where: {
            age_name: {
                age: 13,
                name: "Snekchyk"
            }
            //email: "snekchyk@gmail.com"
        }
    })

    console.log(user3)


    const user4 = await prisma.users.findFirst({
        where: {
            name: "Nikita"
        }
    })

    console.log(user4)


    const user5 = await prisma.users.findMany({
        where: {
            name: "Nikita"
        },
        take: 3,
        skip: 1,
        orderBy: {
            age: "asc"
        }
    })

    console.log(user5)
    //console.log(user5.length)


    const user6 = await prisma.users.findMany({
        where: {
            name: { not: "Nikita" }
        }
        // where: {
        //     name: { in: ["Nikita", "Snekchyk"]}
        // }

        // where: {
        //     name: { notIn: ["Nikita"]}
        // }

        // where: {
        //     email: { contains: "gmail.com"}
        // }

        // where: {
        //     email: { endsWith: "@gmail.com" }
        // }

        // where: {
        //     email: { startsWith: "snek" }
        // }

        // where: {
        //     email: { startsWith: "snek" },
        //     name: "Snekchyk"
        // }

        // where: {
        //     AND: [
        //      { email: { startsWith: "snek" } },
        //      { name: "Snekchyk" }
        //     ]
        // }

        // where: {
        //     OR: [
        //      { email: { startsWith: "snek" } },
        //      { name: "Snekchyk" }
        //     ]
        // }
    })

    console.log(user6)



    //UPDATE



    const updatedUser = await prisma.users.update({
        where: {
            email: "MykytaPlay@gmail.com"
        },
        data: {
            age: 14, // Що саме змінюємо
            name: "Nikita The King"
        }
    })

    console.log(updatedUser)



    // DELETE



    const deletedUser = await prisma.users.delete({
        where: {
            email: "Nikita2@gmail.com"
        }
    })

    console.log(deletedUser)

}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())