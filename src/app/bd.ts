import { Food } from "./types";


export const foodList:Food[] = [
  {
    id: 1,
    name: "Hamburguer",
    description: "Delicioso hamburguer com queijo e bacon",
    price: 25.50,
    imageUrl: "/Hamburger.png",
    rating: 4.5,
    favorite: false,
    bigDescription: "Um hambúrguer artesanal preparado com carne suculenta, queijo derretido e fatias crocantes de bacon. Uma combinação perfeita para quem busca sabor intenso, ideal para matar a fome com muito prazer e qualidade."
  },
  {
    id: 2,
    name: "Hamburger vegano",
    description: "Delicioso hamburguer vegano com queijo e bacon",
    price: 28.00,
    imageUrl: "/hamburger2.png",
    rating: 4.8,
    favorite: false,
    bigDescription: "Uma deliciosa alternativa vegana, com hambúrguer à base de plantas, queijo vegano e um 'bacon' vegetal surpreendente. Ideal para quem busca uma refeição saborosa e consciente, sem abrir mão do prazer de comer bem."
  },
  {
    id: 3,
    name: "Hamburger com cheddar",
    description: "Delicioso hamburguer com cheddar",
    price: 26.00,
    imageUrl: "/hamburger3.png",
    rating: 4.9,
    favorite: false,
    bigDescription: "Sabor marcante com muito cheddar derretido sobre uma carne suculenta e temperada na medida certa. Uma explosão de sabor para os amantes de queijo, servido em um pão artesanal macio e fresco."
  },
  {
    id: 4,
    name: "Hamburger de frango",
    description: "Delicioso hamburguer de frango",
    price: 24.00,
    imageUrl: "/hamburger4.png",
    rating: 4.2,
    favorite: false,
    bigDescription: "Feito com peito de frango temperado e grelhado, este hambúrguer é leve, saboroso e perfeito para quem busca uma opção diferente sem perder o prazer de um bom lanche. Acompanhado de molho especial e vegetais frescos."
  }
]