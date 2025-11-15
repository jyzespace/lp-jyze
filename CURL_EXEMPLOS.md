# 📡 Exemplos de CURL - API Chat Jyze

## 🚀 Iniciar a API

Primeiro, inicie o servidor da API:

```bash
cd api-server
npm install
npm start
```

A API vai rodar em `http://localhost:3001`

---

## 📝 1. Enviar Mensagem de Texto

```bash
curl -X POST http://localhost:3001/api/send-message \
  -H 'Content-Type: application/json' \
  -d '{"message": "Olá! Temos uma promoção especial hoje!", "sender": "Jyze Bot"}'
```

**Resposta:**
```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso",
  "data": {
    "id": 1,
    "type": "text",
    "role": "assistant",
    "content": "Olá! Temos uma promoção especial hoje!",
    "sender": "Jyze Bot",
    "timestamp": "2025-11-02T14:30:00.000Z",
    "read": false
  }
}
```

---

## 🖼️ 2. Enviar Imagem (com URL)

```bash
curl -X POST http://localhost:3001/api/send-image \
  -H 'Content-Type: application/json' \
  -d '{"imageUrl": "https://picsum.photos/400/300", "caption": "Confira nossa promoção!", "sender": "Marketing"}'
```

**Resposta:**
```json
{
  "success": true,
  "message": "Imagem enviada com sucesso",
  "data": {
    "id": 2,
    "type": "image",
    "role": "assistant",
    "imageUrl": "https://picsum.photos/400/300",
    "content": "Confira nossa promoção!",
    "sender": "Marketing",
    "timestamp": "2025-11-02T14:31:00.000Z",
    "read": false
  }
}
```

---

## 📸 3. Enviar Imagem do seu Produto

```bash
curl -X POST http://localhost:3001/api/send-image \
  -H 'Content-Type: application/json' \
  -d '{
    "imageUrl": "https://exemplo.com/meu-produto.jpg",
    "caption": "🎉 Promoção imperdível! Peça agora pelo WhatsApp",
    "sender": "Equipe Jyze"
  }'
```

---

## ✅ 4. Verificar Status da API

```bash
curl http://localhost:3001/api/status
```

**Resposta:**
```json
{
  "status": "online",
  "messagesCount": 2,
  "uptime": 3600.5
}
```

---

## 📬 5. Buscar Mensagens Não Lidas

```bash
curl http://localhost:3001/api/get-messages
```

---

## 🗑️ 6. Limpar Todas as Mensagens

```bash
curl -X DELETE http://localhost:3001/api/clear-messages
```

---

## 💡 Exemplos Práticos

### Enviar mensagem de promoção
```bash
curl -X POST http://localhost:3001/api/send-message \
  -H 'Content-Type: application/json' \
  -d '{"message": "🔥 PROMOÇÃO: 20% OFF em todos os produtos até meia-noite!", "sender": "Promoções Jyze"}'
```

### Enviar banner de promoção
```bash
curl -X POST http://localhost:3001/api/send-image \
  -H 'Content-Type: application/json' \
  -d '{"imageUrl": "https://i.imgur.com/exemplo.jpg", "caption": "Confira nosso novo cardápio!"}'
```

### Enviar mensagem simples
```bash
curl -X POST http://localhost:3001/api/send-message \
  -H 'Content-Type: application/json' \
  -d '{"message": "Estamos online! Como podemos ajudar?"}'
```

### Enviar foto do Instagram
```bash
curl -X POST http://localhost:3001/api/send-image \
  -H 'Content-Type: application/json' \
  -d '{"imageUrl": "https://instagram.com/p/exemplo/media/?size=l", "caption": "Viu nosso novo post?"}'
```

---

## 🔧 Como Usar

1. **Inicie a API** em um terminal:
   ```bash
   cd api-server
   npm start
   ```

2. **Inicie o site** em outro terminal:
   ```bash
   npm run dev
   ```

3. **Abra o site** no navegador: `http://localhost:5173`

4. **Envie mensagens** usando curl em outro terminal

5. **Veja as mensagens aparecerem** automaticamente no chat do site a cada 3 segundos!

---

## 📝 Notas Importantes

- ✅ O chat busca mensagens automaticamente a cada **3 segundos**
- ✅ Você pode enviar **textos** e **imagens**
- ✅ A imagem deve ser uma **URL válida** (http:// ou https://)
- ✅ Mensagens aparecem como se viessem da **IA/Assistente**
- ⚠️ As mensagens ficam em **memória** (reiniciar a API apaga tudo)

---

## 🎯 Use Cases

### 1. Notificar clientes de promoções
```bash
curl -X POST http://localhost:3001/api/send-message -H 'Content-Type: application/json' \
  -d '{"message": "🎉 NOVO: Combo família por apenas R$ 49,90!"}'
```

### 2. Mostrar novo produto
```bash
curl -X POST http://localhost:3001/api/send-image -H 'Content-Type: application/json' \
  -d '{"imageUrl": "URL_DA_SUA_IMAGEM", "caption": "Lançamento! Peça já pelo WhatsApp"}'
```

### 3. Avisar sobre tempo de entrega
```bash
curl -X POST http://localhost:3001/api/send-message -H 'Content-Type: application/json' \
  -d '{"message": "⏰ Estamos com movimento alto. Tempo de entrega: 60-80 minutos"}'
```

