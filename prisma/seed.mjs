import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const defaultProducts = [
  {
    name: 'Hamburguer',
    description: 'Delicioso hamburguer com queijo e bacon',
    price: 25.5,
    imageUrl: '/Hamburger.png',
    rating: 4.5,
    bigDescription: 'Um hambúrguer artesanal preparado com carne suculenta, queijo derretido e fatias crocantes de bacon. Uma combinação perfeita para quem busca sabor intenso, ideal para matar a fome com muito prazer e qualidade.',
  },
  {
    name: 'Hamburger vegano',
    description: 'Delicioso hamburguer vegano com queijo e bacon',
    price: 28,
    imageUrl: '/hamburger2.png',
    rating: 4.8,
    bigDescription: "Uma deliciosa alternativa vegana, com hambúrguer à base de plantas, queijo vegano e um 'bacon' vegetal surpreendente. Ideal para quem busca uma refeição saborosa e consciente, sem abrir mão do prazer de comer bem.",
  },
  {
    name: 'Hamburger com cheddar',
    description: 'Delicioso hamburguer com cheddar',
    price: 26,
    imageUrl: '/hamburger3.png',
    rating: 4.9,
    bigDescription: 'Sabor marcante com muito cheddar derretido sobre uma carne suculenta e temperada na medida certa. Uma explosão de sabor para os amantes de queijo, servido em um pão artesanal macio e fresco.',
  },
  {
    name: 'Hamburger de frango',
    description: 'Delicioso hamburguer de frango',
    price: 24,
    imageUrl: '/hamburger4.png',
    rating: 4.2,
    bigDescription: 'Feito com peito de frango temperado e grelhado, este hambúrguer é leve, saboroso e perfeito para quem busca uma opção diferente sem perder o prazer de um bom lanche. Acompanhado de molho especial e vegetais frescos.',
  },
]

async function main() {
  // Hash da senha para o usuário admin
  const hashedPassword = await bcrypt.hash('admin123', 10)

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

  // Cria produtos padrão (apenas se a tabela estiver vazia)
  const productCount = await prisma.product.count()
  if (productCount === 0) {
    await prisma.product.createMany({
      data: defaultProducts,
    })
    console.log(`Created ${defaultProducts.length} default products`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })