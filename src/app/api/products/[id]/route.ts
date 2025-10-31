import { PrismaClient, Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';


const prisma = new PrismaClient();

export async function GET(
  request: Request,
  context: { params: { id: string } } // Receber o contexto inteiro
) {
  try {
    const productId = context.params.id; // Acessar o id através do contexto

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);

  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json({ error: 'Error fetching product' }, { status: 500 });
  }
}

// 2. Corrigir também a assinatura da função DELETE para consistência
export async function DELETE(
  request: Request,
  context: { params: { id:string } } // Receber o contexto inteiro
) {
  try {
    const productId = context.params.id; // Acessar o id através do contexto

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error("Request error", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Error deleting product' }, { status: 500 });
  }
}
