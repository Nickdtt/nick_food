# Use a imagem oficial do Node.js como base
FROM node:20-alpine AS base

# 1. Instalar dependências do sistema operacional necessárias para o Prisma
#    e outras ferramentas (ex: git, openssh para deploy, curl para saúde)
FROM base AS deps
RUN apk add --no-cache libc6-compat git openssh curl
WORKDIR /app

# Copiar package.json e package-lock.json para instalar dependências
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; \
  else npm install --frozen-lockfile; \
  fi

# 2. Builder da aplicação Next.js
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Garantir que o Prisma Client seja gerado durante o build
# Usar um valor temporário para o build
ENV DATABASE_URL="file:./dev.db" 
RUN npx prisma generate
RUN npm run build

# 3. Imagem final de produção
FROM base AS runner
WORKDIR /app

# Definir variáveis de ambiente para produção
ENV NODE_ENV production
# Desativar telemetria do Next.js
ENV NEXT_TELEMETRY_DISABLED 1

# Copiar arquivos essenciais do builder
# Copiar a pasta prisma
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma 

# Expor a porta que o Next.js usa
EXPOSE 3000

# 4. Comando de inicialização da aplicação
#    Este script será o ponto de entrada do contêiner
COPY ./entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
