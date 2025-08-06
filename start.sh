#!/bin/bash

echo "🚀 Starting Node API..."

# Aguardar o banco estar disponível
echo "⏳ Waiting for database..."
timeout=60
while ! pg_isready -h $(echo $DATABASE_URL | cut -d'@' -f2 | cut -d'/' -f1) -p 5432 > /dev/null 2>&1; do
    timeout=$((timeout - 1))
    if [ $timeout -eq 0 ]; then
        echo "❌ Database connection timeout"
        exit 1
    fi
    echo "⏳ Database not ready yet... waiting ($timeout seconds left)"
    sleep 1
done

echo "✅ Database is ready!"

# Executar migrations
echo "🔄 Running migrations..."
pnpm run migrate:up

if [ $? -eq 0 ]; then
    echo "✅ Migrations completed successfully"
else
    echo "❌ Migrations failed"
    exit 1
fi

# Executar seeds se for development
if [ "$NODE_ENV" = "development" ]; then
    echo "🌱 Running seeds..."
    pnpm run migrate:seed
fi

# Iniciar aplicação
echo "🎯 Starting application..."
pnpm run production
