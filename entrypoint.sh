#!/bin/sh
set -e

echo "Running database migrations..."
npx prisma migrate deploy

echo "Seeding database (admin user)..."
npx prisma db seed

echo "Starting Next.js application..."
exec npm run start
