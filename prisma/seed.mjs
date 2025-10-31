import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Hash da senha para o usuário admin
  const hashedPassword = await bcrypt.hash('admin123', 10) // 'admin123' é a senha, 10 é o saltRounds

  // Cria ou atualiza o usuário admin
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {
      name: 'Admin User',
      password: hashedPassword,
    },
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
    },
  })

  console.log(`Admin user created/updated: ${adminUser.email}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })