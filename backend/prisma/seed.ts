import { faker } from '@faker-js/faker'
import { Prisma, PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
  const userData: Prisma.UserCreateInput[] = [...Array(1000)].map(() => {
    faker.seed()

    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const email = faker.internet.email({ firstName, lastName })

    return {
      firstName,
      lastName,
      email,
      role: faker.helpers.enumValue(Role),
      createdAt: faker.date.past()
    }
  })

  await prisma.user.createMany({ data: userData })
}

console.log('Start seeding...')

main()
  .then(async () => {
    console.log('Seeding finished.')
  })
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
