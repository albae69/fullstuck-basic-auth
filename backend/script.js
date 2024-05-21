// const { PrismaClient } = require('@prisma/client')
// const prisma = new PrismaClient()

// async function main() {
//   const updateUser = await prisma.user.update({
//     where: {
//       email: 'email@albae69.dev',
//     },
//     data: {
//       password: '123456',
//     },
//   })
//   console.log('updateUser', updateUser)
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })
