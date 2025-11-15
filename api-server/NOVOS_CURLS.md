# 🚀 NOVOS CURLS COM SISTEMA DE SESSION ID

## ⚠️ IMPORTANTE: NOVO SISTEMA

Agora cada usuário tem um **ID único (sessionId)** que você precisa usar para enviar mensagens específicas!

---

## 📋 PASSO A PASSO

### 1️⃣ Primeiro, veja quem está online

```bash
curl http://localhost:3001/api/list-users
```

**Resposta:**
```json
{
  "success": true,
  "users": [
    {
      "sessionId": "user_1730566800123_abc123xyz",
      "firstSeen": "2025-11-02T14:30:00.000Z",
      "lastSeen": "2025-11-02T14:35:00.000Z",
      "messageCount": 3,
      "lastMessage": "Olá, preciso de ajuda"
    }
  ],
  "count": 1,
  "help": "Use o campo sessionId de cada usuário como targetId para enviar mensagens"
}
```

💡 **Copie o `sessionId` do usuário que você quer enviar mensagem!**

---

### 2️⃣ Enviar MENSAGEM DE TEXTO para um usuário específico

```bash
curl -X POST http://localhost:3001/api/send-message \
  -H 'Content-Type: application/json' \
  -d '{
    "targetId": "user_1730566800123_abc123xyz",
    "message": "Olá! Como posso ajudar você?",
    "sender": "Suporte Jyze"
  }'
```

**Substitua** `user_1730566800123_abc123xyz` pelo sessionId do usuário!

---

### 3️⃣ Enviar IMAGEM para um usuário específico

```bash
curl -X POST http://localhost:3001/api/send-image \
  -H 'Content-Type: application/json' \
  -d '{
    "targetId": "user_1730566800123_abc123xyz",
    "imageUrl": "https://picsum.photos/400/300",
    "caption": "Confira nossa promoção!",
    "sender": "Marketing"
  }'
```

**Substitua** `user_1730566800123_abc123xyz` pelo sessionId do usuário!

---

## 🔥 FLUXO COMPLETO

### Exemplo Prático:

```bash
# 1. Ver quem está online
curl http://localhost:3001/api/list-users

# 2. Copiar o sessionId da resposta (exemplo: user_1730566800123_abc123xyz)

# 3. Enviar mensagem para esse usuário
curl -X POST http://localhost:3001/api/send-message \
  -H 'Content-Type: application/json' \
  -d '{"targetId": "user_1730566800123_abc123xyz", "message": "Olá! Tudo bem?"}'

# 4. Enviar imagem para esse usuário
curl -X POST http://localhost:3001/api/send-image \
  -H 'Content-Type: application/json' \
  -d '{"targetId": "user_1730566800123_abc123xyz", "imageUrl": "https://exemplo.com/promo.jpg", "caption": "Veja isso!"}'
```

---

## 💡 DICAS

### Como obter o sessionId de um usuário?

**Opção 1:** Quando o usuário enviar mensagem, o webhook receberá o `sessionId`

**Webhook recebe:**
```json
{
  "sessionId": "user_1730566800123_abc123xyz",
  "message": "Olá!",
  "timestamp": "2025-11-02T14:30:00.000Z"
}
```

**Opção 2:** Listar todos os usuários ativos:
```bash
curl http://localhost:3001/api/list-users
```

---

## ❌ O que NÃO funciona mais

### ❌ ERRADO (vai dar erro):
```bash
# SEM targetId - VAI DAR ERRO!
curl -X POST http://localhost:3001/api/send-message \
  -H 'Content-Type: application/json' \
  -d '{"message": "Olá!"}'
```

**Erro:**
```json
{
  "error": "targetId ou sessionId é obrigatório. Use o ID do usuário que você quer enviar a mensagem."
}
```

### ✅ CERTO:
```bash
# COM targetId - FUNCIONA!
curl -X POST http://localhost:3001/api/send-message \
  -H 'Content-Type: application/json' \
  -d '{"targetId": "user_1730566800123_abc123xyz", "message": "Olá!"}'
```

---

## 🔍 Outros Endpoints Úteis

### Verificar status
```bash
curl http://localhost:3001/api/status
```

### Limpar mensagens
```bash
curl -X DELETE http://localhost:3001/api/clear-messages
```

---

## 📝 Resumo

1. **Usuário envia mensagem** → Webhook recebe com `sessionId`
2. **Você pega o `sessionId`** do webhook ou via `/api/list-users`
3. **Você envia resposta** usando curl com `targetId` = `sessionId` do usuário
4. **Usuário vê a mensagem** automaticamente no chat (a cada 3 segundos)

---

## 🎯 Exemplo Real

```bash
# Passo 1: Usuário envia "Olá" no site
# Webhook recebe: {"sessionId": "user_1730566800123_abc", "message": "Olá"}

# Passo 2: Você lista usuários
curl http://localhost:3001/api/list-users
# Resposta mostra: user_1730566800123_abc

# Passo 3: Você responde
curl -X POST http://localhost:3001/api/send-message \
  -H 'Content-Type: application/json' \
  -d '{"targetId": "user_1730566800123_abc", "message": "Oi! Como posso ajudar?"}'

# Passo 4: Mensagem aparece no chat do usuário automaticamente!
```

---

## ✅ Pronto!

Agora você tem controle total sobre **quem** recebe **qual** mensagem! 🎉

