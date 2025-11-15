#!/bin/bash

# Exemplos de como usar a API com curl

echo "=========================================="
echo "EXEMPLOS DE USO DA API - JYZE CHAT"
echo "=========================================="
echo ""

# 1. Enviar mensagem de texto
echo "1️⃣  ENVIAR MENSAGEM DE TEXTO:"
echo ""
echo "curl -X POST http://localhost:3001/api/send-message \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"message\": \"Olá! Temos uma promoção especial hoje!\", \"sender\": \"Jyze Bot\"}'"
echo ""
echo "Executando..."
curl -X POST http://localhost:3001/api/send-message \
  -H 'Content-Type: application/json' \
  -d '{"message": "Olá! Temos uma promoção especial hoje!", "sender": "Jyze Bot"}'
echo -e "\n"

sleep 2

# 2. Enviar imagem com legenda
echo "2️⃣  ENVIAR IMAGEM COM LEGENDA:"
echo ""
echo "curl -X POST http://localhost:3001/api/send-image \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"imageUrl\": \"https://example.com/promo.jpg\", \"caption\": \"Confira nossa promoção!\", \"sender\": \"Jyze Bot\"}'"
echo ""
echo "Executando..."
curl -X POST http://localhost:3001/api/send-image \
  -H 'Content-Type: application/json' \
  -d '{"imageUrl": "https://picsum.photos/400/300", "caption": "Confira nossa promoção!", "sender": "Jyze Bot"}'
echo -e "\n"

sleep 2

# 3. Verificar status da API
echo "3️⃣  VERIFICAR STATUS DA API:"
echo ""
echo "curl http://localhost:3001/api/status"
echo ""
echo "Executando..."
curl http://localhost:3001/api/status
echo -e "\n"

sleep 2

# 4. Buscar mensagens
echo "4️⃣  BUSCAR MENSAGENS NÃO LIDAS:"
echo ""
echo "curl http://localhost:3001/api/get-messages"
echo ""
echo "Executando..."
curl http://localhost:3001/api/get-messages
echo -e "\n"

echo "=========================================="
echo "✅ Testes concluídos!"
echo "=========================================="

