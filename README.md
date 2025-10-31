# Food App - Cardápio Digital e Painel Administrativo

Este é um projeto full-stack desenvolvido com Next.js, que simula um aplicativo de cardápio digital para clientes e um painel administrativo para gerenciamento de produtos e pedidos.

## Visão Geral do Projeto

O objetivo deste projeto é criar uma plataforma completa onde:
*   **Clientes** podem navegar por um cardápio digital, adicionar itens ao carrinho, marcar favoritos e fazer pedidos.
*   **Administradores** podem gerenciar o cardápio (produtos) e acompanhar os pedidos através de um painel seguro.

## Funcionalidades Implementadas

### Para Clientes
*   Listagem de produtos (cardápio) com preços visíveis.
*   Página de detalhes do produto com preços visíveis e busca de dados otimizada via cache do TanStack Query.
*   Carrinho de compras (adicionar/remover itens, ajustar quantidade).
*   Página de favoritos (exibe itens marcados como favoritos).
*   Navegação responsiva.

### Para Administradores
*   **Autenticação Segura:** Login de administrador com e-mail e senha.
*   **Rotas Protegidas:** Acesso restrito ao painel administrativo apenas para usuários autenticados.
*   **Painel de Controle:** Layout com barra lateral para navegação entre as seções, agora **responsivo** (menu hambúrguer em telas pequenas).
*   **Gerenciamento de Produtos (CRUD):**
    *   Listagem de produtos com miniaturas de imagem.
    *   Adicionar novos produtos via formulário modal.
    *   Excluir produtos existentes com confirmação.
    *   (Funcionalidade de Edição a ser implementada).
*   **Logout:** Funcionalidade para sair da sessão administrativa.
*   **Página de Login:** Estilizada com tema suave (branco e vermelho) e separada das rotas admin.

## Tecnologias Utilizadas

*   **Framework:** Next.js 15.3.1 (App Router)
*   **Linguagem:** TypeScript
*   **Estilização:** Tailwind CSS
*   **Componentes UI:** Shadcn/ui (para alguns componentes base)
*   **Gerenciamento de Estado (Frontend):** Zustand (para carrinho e favoritos)
*   **ORM:** Prisma (para interação com o banco de dados SQLite)
*   **Autenticação:** `next-auth` (Auth.js v5 beta) com `CredentialsProvider`
*   **Hashing de Senhas:** `bcrypt`
*   **Notificações:** Sonner (para toasts)
*   **Gerenciamento de Estado do Servidor:** TanStack Query (integrado para busca, cache e mutações)
*   **Ícones:** `lucide-react` (para ícones vetoriais)

## Melhorias e Correções Recentes

*   **Refatoração da Página de Detalhes do Produto:** Otimização da busca de dados para usar o cache do TanStack Query, eliminando chamadas de API redundantes e melhorando a performance.
*   **Configuração de Imagens Externas:** Adicionada configuração no `next.config.ts` para permitir o carregamento de imagens de domínios externos (`static.itdg.com.br`).
*   **Correção de Erro `NaN`:** Resolvido problema no formulário de produtos onde o campo de preço gerava `NaN` ao ser esvaziado.
*   **Correção de Erro de Parâmetros de Rota:** Ajustada a forma como os IDs são lidos nas rotas de API dinâmicas (`/api/products/[id]`) para compatibilidade com o Next.js, resolvendo erros `405` e `params should be awaited`.
*   **Separação de Configuração de Autenticação:** Esclarecida a importância da separação entre `auth.config.ts` e `auth.ts` para compatibilidade com o Edge Runtime.

## Configuração e Instalação

Primeiro, clone o repositório e instale as dependências:

```bash
git clone [URL_DO_SEU_REPOSITORIO]
cd food_app
npm install
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
DATABASE_URL="file:./dev.db"
AUTH_SECRET="SUA_CHAVE_SECRETA_SEGURA_AQUI" # Gerar uma string longa e aleatória (ex: openssl rand -base64 32)
```

### Banco de Dados

1.  **Aplicar Migrações e Gerar Cliente Prisma:**
    ```bash
    npx prisma migrate dev --name init
    ```
    *(Se você já tem migrações, use `npx prisma migrate deploy`)*

2.  **Popular o Banco de Dados (Seed):**
    ```bash
    npx prisma db seed
    ```
    Isso criará um usuário administrador padrão: `admin@example.com` com senha `admin123`.
    *(Lembre-se que o `rating` dos produtos agora tem um valor padrão de `0`.)*

### Rodar o Servidor de Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

*   Para acessar o painel administrativo, vá para [http://localhost:3000/login](http://localhost:3000/login).

## Próximos Passos

As próximas etapas de desenvolvimento incluem:

*   **Gestão de Produtos:** Implementar a funcionalidade de **Atualizar (Editar)** produtos no painel administrativo.
*   **Gestão de Pedidos:** Desenvolver a visualização e atualização de status dos pedidos no painel administrativo, também com TanStack Query.

## Saiba Mais

*   [Next.js Documentation](https://nextjs.org/docs)
*   [TanStack Query Documentation](https://tanstack.com/query/latest/docs/react/overview)
*   [Auth.js (Next-Auth) Documentation](https://authjs.dev/getting-started/introduction)