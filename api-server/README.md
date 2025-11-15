# API Chat Jyze

API simples para enviar mensagens e imagens para o chat da landing page Jyze.

## 🚀 Como usar

### 1. Instalar dependências

```bash
cd api-server
npm install
```

### 2. Iniciar o servidor

```bash
npm start
```

O servidor vai rodar em `http://localhost:3001`

## 📡 Endpoints

### POST `/api/send-message` - Enviar Mensagem de Texto

Envia uma mensagem de texto para aparecer no chat.

**Body (JSON):**
```json
{
  "message": "Sua mensagem aqui",
  "sender": "Nome do remetente (opcional)"
}
```

**Exemplo curl:**
```bash
curl -X POST http://localhost:3001/api/send-message \
  -H 'Content-Type: application/json' \
  -d '{"message": "Olá! Como posso ajudar?", "sender": "Suporte Jyze"}'
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
    "content": "Olá! Como posso ajudar?",
    "sender": "Suporte Jyze",
    "timestamp": "2025-11-02T14:30:00.000Z",
    "read": false
  }
}
```

---

### POST `/api/send-image` - Enviar Imagem

Envia uma imagem (URL) para aparecer no chat.

**Body (JSON):**
```json
{
  "imageUrl": "https://exemplo.com/imagem.jpg",
  "caption": "Legenda da imagem (opcional)",
  "sender": "Nome do remetente (opcional)"
}
```

**Exemplo curl:**
```bash
curl -X POST http://localhost:3001/api/send-image \
  -H 'Content-Type: application/json' \
  -d '{"imageUrl": "https://picsum.photos/400/300", "caption": "Confira esta promoção!", "sender": "Marketing"}'
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
    "content": "Confira esta promoção!",
    "sender": "Marketing",
    "timestamp": "2025-11-02T14:31:00.000Z",
    "read": false
  }
}
```

---

### GET `/api/get-messages` - Buscar Mensagens

Busca todas as mensagens não lidas e marca como lidas.

**Exemplo curl:**
```bash
curl http://localhost:3001/api/get-messages
```

**Resposta:**
```json
{
  "success": true,
  "messages": [
    {
      "id": 1,
      "type": "text",
      "role": "assistant",
      "content": "Olá! Como posso ajudar?",
      "sender": "Suporte Jyze",
      "timestamp": "2025-11-02T14:30:00.000Z",
      "read": true
    }
  ],
  "count": 1
}
```

---

### GET `/api/status` - Status da API

Verifica se a API está online.

**Exemplo curl:**
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

### DELETE `/api/clear-messages` - Limpar Mensagens

Remove todas as mensagens da memória.

**Exemplo curl:**
```bash
curl -X DELETE http://localhost:3001/api/clear-messages
```

---

## 🧪 Testar Rapidamente

Execute o script de exemplos:

```bash
chmod +x exemplos-curl.sh
./exemplos-curl.sh
```

## 📝 Notas

- As mensagens são armazenadas em **memória** (não persistem após reiniciar o servidor)
- Para produção, use um banco de dados (MongoDB, PostgreSQL, etc.)
- A API aceita CORS de qualquer origem (ajuste para produção)

