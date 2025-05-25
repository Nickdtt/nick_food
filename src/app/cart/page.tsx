import Link from "next/link";

export default function CartPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <p className="text-gray-500">Seu carrinho está vazio.</p>
      <Link href="/" className="mt-4">
        <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        Voltar para as compras!
        </button>
      </Link>
      
    </div>
  );
}