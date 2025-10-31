import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) { // Removido o segundo argumento
  try {
    // Abordagem alternativa: pegar o ID da URL
    const url = new URL(request.url);
    const productId = url.pathname.split('/').pop(); 

    if (!productId) {
      return NextResponse.json({ error: 'Product ID not found in URL' }, { status: 400 });
    }

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

export async function DELETE(request: Request) { // Removido o segundo argumento
  try {
    // Abordagem alternativa: pegar o ID da URL
    const url = new URL(request.url);
    const productId = url.pathname.split('/').pop();

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
    if (error instanceof prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Error deleting product' }, { status: 500 });
  }
}
