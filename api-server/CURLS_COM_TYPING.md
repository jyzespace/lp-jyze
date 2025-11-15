# 🚀 CURLS COM TYPING DELAY - Sistema de "Digitando..."

## ⭐ NOVO: Parâmetro `typingDelay`

Agora você pode simular que a IA está digitando antes de enviar a mensagem!

---

## 📝 SINTAXE

### Enviar Mensagem COM delay de digitação:

```bash
curl -X POST https://SUA-URL-NGROK.ngrok.io/api/send-message \
  -H 'Content-Type: application/json' \
  -d '{
    "targetId": "SESSION_ID_DO_USUARIO",
    "message": "Sua mensagem aqui",
    "typingDelay": 3
  }'
```

**`typingDelay`**: Tempo em segundos que a IA vai ficar "digitando..." antes de enviar

---

## 🎯 EXEMPLOS PRÁTICOS

### 1️⃣ Mensagem rápida (1 segundo digitando)

```bash
curl -X POST https://SUA-URL-NGROK.ngrok.io/api/send-message \
  -H 'Content-Type: application/json' \
  -d '{
    "targetId": "user_1762122506836_bm75mys78",
    "message": "Oi!",
    "typingDelay": 1
  }'
```

---

### 2️⃣ Mensagem com delay realista (3 segundos)

```bash
curl -X POST https://SUA-URL-NGROK.ngrok.io/api/send-message \
  -H 'Content-Type: application/json' \
  -d '{
    "targetId": "user_1762122506836_bm75mys78",
    "message": "Olá! Como posso ajudar você hoje? 😊",
    "typingDelay": 3
  }'
```

---

### 3️⃣ Mensagem longa (5 segundos digitando)

```bash
curl -X POST https://SUA-URL-NGROK.ngrok.io/api/send-message \
  -H 'Content-Type: application/json' \
  -d '{
    "targetId": "user_1762122506836_bm75mys78",
    "message": "Claro! Para entender melhor como posso ajudar, me conte um pouco sobre o seu negócio. Você já usa algum sistema de delivery atualmente?",
    "typingDelay": 5
  }'
```

---

### 4️⃣ Mensagem instantânea (SEM delay)

```bash
curl -X POST https://SUA-URL-NGROK.ngrok.io/api/send-message \
  -H 'Content-Type: application/json' \
  -d '{
    "targetId": "user_1762122506836_bm75mys78",
    "message": "Ok! 👍"
  }'
```

**Sem `typingDelay`** = mensagem aparece instantaneamente

---

## 🖼️ IMAGENS COM TYPING DELAY

### Enviar imagem com 4 segundos de "digitando..."

```bash
curl -X POST https://SUA-URL-NGROK.ngrok.io/api/send-image \
  -H 'Content-Type: application/json' \
  -d '{
    "targetId": "user_1762122506836_bm75mys78",
    "imageUrl": "https://picsum.photos/400/300",
    "caption": "Confira nossa promoção especial! 🔥",
    "typingDelay": 4
  }'
```

---

## 💡 SEQUÊNCIA DE MENSAGENS

Criar uma conversa natural com delays:

```bash
# Mensagem 1 - 2 segundos
curl -X POST https://SUA-URL-NGROK.ngrok.io/api/send-message \
  -H 'Content-Type: application/json' \
  -d '{"targetId": "user_123", "message": "Oi! Tudo bem?", "typingDelay": 2}'

# Mensagem 2 - 3 segundos (aparece 3s depois)
curl -X POST https://SUA-URL-NGROK.ngrok.io/api/send-message \
  -H 'Content-Type: application/json' \
  -d '{"targetId": "user_123", "message": "Vou te mostrar algo incrível...", "typingDelay": 3}'

# Imagem - 4 segundos (aparece 4s depois)
curl -X POST https://SUA-URL-NGROK.ngrok.io/api/send-image \
  -H 'Content-Type: application/json' \
  -d '{"targetId": "user_123", "imageUrl": "https://exemplo.com/promo.jpg", "caption": "Olha só! 🎉", "typingDelay": 4}'
```

**Resultado:** Usuário vê 3 indicadores de "digitando..." um após o outro! 🔥

---

## ⏱️ DICAS DE TIMING

### Mensagens Curtas (até 10 caracteres)
```json
"typingDelay": 1
```
Exemplo: "Oi!", "Sim", "Ok"

### Mensagens Médias (10-50 caracteres)
```json
"typingDelay": 2
```
Exemplo: "Como posso ajudar você?"

### Mensagens Longas (50-150 caracteres)
```json
"typingDelay": 3
```
Exemplo: "Entendo! Deixe-me verificar as melhores opções para você..."

### Mensagens Muito Longas (150+ caracteres)
```json
"typingDelay": 5
```

### Imagens
```json
"typingDelay": 3
```
Simula tempo de upload/envio

---

## 📊 COMO FUNCIONA

1. **Você envia** curl com `typingDelay: 3`
2. **Usuário vê** "IA digitando..." por 3 segundos
3. **Depois de 3s** a mensagem aparece no chat
4. **Tudo automático!** ✨

---

## 🔍 VERIFICAR STATUS

Ver se há mensagens aguardando:

```bash
curl https://SUA-URL-NGROK.ngrok.io/api/get-messages?sessionId=user_123
```

Resposta mostra:
```json
{
  "success": true,
  "messages": [...],
  "isTyping": true,
  "nextMessageIn": 2
}
```

- **`isTyping`**: Se está "digitando"
- **`nextMessageIn`**: Segundos até próxima mensagem

---

## ✅ RESUMO RÁPIDO

### SEM delay (instantâneo)
```bash
curl -X POST URL -H 'Content-Type: application/json' -d '{"targetId": "ID", "message": "Oi!"}'
```

### COM delay (3 segundos)
```bash
curl -X POST URL -H 'Content-Type: application/json' -d '{"targetId": "ID", "message": "Oi!", "typingDelay": 3}'
```

### Imagem COM delay (4 segundos)
```bash
curl -X POST URL_IMAGE -H 'Content-Type: application/json' -d '{"targetId": "ID", "imageUrl": "URL", "typingDelay": 4}'
```

---

## 🎯 Use Cases

### Conversa Natural
```bash
# Simula pessoa real digitando
typingDelay: 2-4 segundos
```

### Resposta Rápida
```bash
# Respostas curtas automáticas
typingDelay: 1 segundo
```

### Mensagem Importante
```bash
# Cria antecipação
typingDelay: 5 segundos
```

### Sem Delay
```bash
# Respostas instantâneas de bot
Sem typingDelay
```

---

## 🚀 Pronto para usar!

Agora suas mensagens ficam muito mais naturais! 🎉

