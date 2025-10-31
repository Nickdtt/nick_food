import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// A função GET existente (inalterada)
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 });
  }
}

// 1. Adicionar a função POST que está faltando
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Extrair os dados do corpo da requisição
    const { name, description, price, imageUrl, bigDescription } = body;

    // Validar se os campos necessários foram enviados
    if (!name || !description || !price || !imageUrl || !bigDescription) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        bigDescription,
        // Adicionar um valor padrão para rating, que não vem do formulário
        rating: 0, 
      },
    });

    return NextResponse.json(newProduct, { status: 201 }); // 201 = Created

  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json({ error: "Error creating product" }, { status: 500 });
  }
}