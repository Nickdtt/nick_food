#!/bin/sh

# Este script é simplificado para o modo "demo" sem persistência de alterações.
# Ele apenas inicia a aplicação. O dev.db já estará na imagem.

echo "Starting Next.js application..."
exec npm run start
