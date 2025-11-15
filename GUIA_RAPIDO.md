# 🚀 GUIA RÁPIDO - API Chat Jyze

## ⚡ Como Usar em 3 Passos

### 1️⃣ Instalar e iniciar a API

```bash
cd api-server
npm install
npm start
```

✅ API rodando em `http://localhost:3001`

---

### 2️⃣ Iniciar o site (em outro terminal)

```bash
cd ..
npm run dev
```

✅ Site rodando em `http://localhost:5173`

---

### 3️⃣ Enviar mensagens via CURL

#### 📝 Enviar TEXTO:
```bash
curl -X POST http://localhost:3001/api/send-message \
  -H 'Content-Type: application/json' \
  -d '{"message": "Olá! Como posso ajudar?"}'
```

#### 🖼️ Enviar IMAGEM:
```bash
curl -X POST http://localhost:3001/api/send-image \
  -H 'Content-Type: application/json' \
  -d '{"imageUrl": "https://picsum.photos/400/300", "caption": "Veja esta promoção!"}'
```

---

## 🎯 Resultado

✅ As mensagens aparecem **automaticamente** no chat do site a cada 3 segundos!

---

## 📚 Mais Exemplos

Veja o arquivo `CURL_EXEMPLOS.md` para mais exemplos detalhados!

