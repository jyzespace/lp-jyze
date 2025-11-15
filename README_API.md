# 🚀 API Chat Jyze - Documentação Completa

## 📋 Visão Geral

Esta API permite enviar mensagens de texto e imagens para o chat da landing page Jyze via curl ou qualquer cliente HTTP.

## 🎯 Recursos

- ✅ Enviar mensagens de texto para o chat
- ✅ Enviar imagens (via URL) para o chat
- ✅ Mensagens aparecem automaticamente no site (a cada 3 segundos)
- ✅ Suporte para legendas em imagens
- ✅ API REST simples e fácil de usar

---

## 🚀 Início Rápido

### 1. Instalar dependências da API

```bash
cd api-server
npm install
```

### 2. Iniciar o servidor da API

```bash
npm start
```

A API estará disponível em: `http://localhost:3001`

### 3. Em outro terminal, iniciar o site

```bash
cd ..
npm run dev
```

O site estará disponível em: `http://localhost:5173`

### 4. Testar enviando uma mensagem

```bash
curl -X POST http://localhost:3001/api/send-message \
  -H 'Content-Type: application/json' \
  -d '{"message": "Olá! Teste de mensagem"}'
```

---

## 📡 Endpoints da API

### 1. POST `/api/send-message` - Enviar Mensagem de Texto

Envia uma mensagem de texto para o chat.

**Request:**
```bash
curl -X POST http://localhost:3001/api/send-message \
  -H 'Content-Type: application/json' \
  -d '{
    "message": "Sua mensagem aqui",
    "sender": "Nome do remetente (opcional)"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso",
  "data": {
    "id": 1,
    "type": "text",
    "role": "assistant",
    "content": "Sua mensagem aqui",
    "sender": "Nome do remetente",
    "timestamp": "2025-11-02T14:30:00.000Z",
    "read": false
  }
}
```

---

### 2. POST `/api/send-image` - Enviar Imagem

Envia uma imagem (URL) para o chat.

**Request:**
```bash
curl -X POST http://localhost:3001/api/send-image \
  -H 'Content-Type: application/json' \
  -d '{
    "imageUrl": "https://exemplo.com/imagem.jpg",
    "caption": "Legenda da imagem (opcional)",
    "sender": "Nome do remetente (opcional)"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Imagem enviada com sucesso",
  "data": {
    "id": 2,
    "type": "image",
    "role": "assistant",
    "imageUrl": "https://exemplo.com/imagem.jpg",
    "content": "Legenda da imagem",
    "sender": "Nome do remetente",
    "timestamp": "2025-11-02T14:31:00.000Z",
    "read": false
  }
}
```

---

### 3. GET `/api/get-messages` - Buscar Mensagens

Busca todas as mensagens não lidas e as marca como lidas.

**Request:**
```bash
curl http://localhost:3001/api/get-messages
```

**Response:**
```json
{
  "success": true,
  "messages": [
    {
      "id": 1,
      "type": "text",
      "content": "Mensagem",
      "timestamp": "2025-11-02T14:30:00.000Z"
    }
  ],
  "count": 1
}
```

---

### 4. GET `/api/status` - Status da API

Verifica se a API está online.

**Request:**
```bash
curl http://localhost:3001/api/status
```

**Response:**
```json
{
  "status": "online",
  "messagesCount": 5,
  "uptime": 3600.5
}
```

---

### 5. DELETE `/api/clear-messages` - Limpar Mensagens

Remove todas as mensagens da memória.

**Request:**
```bash
curl -X DELETE http://localhost:3001/api/clear-messages
```

**Response:**
```json
{
  "success": true,
  "message": "5 mensagens foram limpas"
}
```

---

## 💡 Exemplos Práticos

### Enviar promoção
```bash
curl -X POST http://localhost:3001/api/send-message \
  -H 'Content-Type: application/json' \
  -d '{"message": "🔥 PROMOÇÃO: 20% OFF em todos os produtos!"}'
```

### Enviar imagem de produto
```bash
curl -X POST http://localhost:3001/api/send-image \
  -H 'Content-Type: application/json' \
  -d '{"imageUrl": "https://exemplo.com/produto.jpg", "caption": "Novo produto disponível! Peça já"}'
```

### Enviar múltiplas mensagens
```bash
curl -X POST http://localhost:3001/api/send-message -H 'Content-Type: application/json' -d '{"message": "Olá!"}'
curl -X POST http://localhost:3001/api/send-message -H 'Content-Type: application/json' -d '{"message": "Temos novidades para você!"}'
curl -X POST http://localhost:3001/api/send-image -H 'Content-Type: application/json' -d '{"imageUrl": "https://picsum.photos/400/300", "caption": "Confira!"}'
```

---

## 📂 Estrutura de Arquivos

```
api-server/
├── server.js              # Servidor da API
├── package.json           # Dependências
├── README.md             # Documentação completa
├── exemplos-curl.sh      # Script com exemplos automatizados
└── CURLS_PRONTOS.txt     # Curls prontos para copiar e colar
```

---

## 🔧 Configuração

### Porta da API

Por padrão a API roda na porta **3001**. Para mudar:

```javascript
// Em server.js
const PORT = 3001; // Mudar para sua porta preferida
```

### CORS

A API aceita requisições de qualquer origem. Para produção, configure o CORS adequadamente:

```javascript
// Em server.js
app.use(cors({
  origin: 'https://seu-dominio.com'
}));
```

---

## 🐛 Troubleshooting

### API não está recebendo mensagens

1. Verifique se a API está rodando:
   ```bash
   curl http://localhost:3001/api/status
   ```

2. Verifique se não há erro de porta em uso

3. Veja os logs do servidor da API

### Mensagens não aparecem no site

1. Certifique-se que o site está rodando
2. Abra o console do navegador (F12) e procure por erros
3. Verifique se você vê logs tipo "📬 Recebidas X mensagens da API"
4. A busca de mensagens ocorre a cada **3 segundos**

### Imagens não aparecem

1. Verifique se a URL da imagem está acessível
2. A URL deve começar com `http://` ou `https://`
3. Verifique CORS da imagem (algumas URLs bloqueiam embedding)

---

## 📚 Arquivos de Referência

- **`GUIA_RAPIDO.md`** - Guia de 3 passos para começar
- **`CURL_EXEMPLOS.md`** - Exemplos detalhados de todos os curls
- **`CURLS_PRONTOS.txt`** - Curls prontos para copiar e colar
- **`exemplos-curl.sh`** - Script automatizado de testes

---

## 🚀 Deploy em Produção

### Recomendações:

1. Use variáveis de ambiente para configuração
2. Configure CORS adequadamente
3. Use um banco de dados (MongoDB, PostgreSQL, etc.)
4. Adicione autenticação na API
5. Use HTTPS
6. Configure rate limiting
7. Adicione logs persistentes

---

## 📝 Notas Importantes

- ⚠️ As mensagens são armazenadas em **memória** (reiniciar apaga tudo)
- ⚠️ Para produção, use um banco de dados real
- ⚠️ Configure segurança adequada antes de expor publicamente
- ✅ O chat busca mensagens automaticamente a cada 3 segundos
- ✅ Mensagens aparecem como vindas do "Assistente Jyze"

---

## 🤝 Suporte

Para dúvidas ou problemas:
1. Veja os arquivos de documentação
2. Execute o script `exemplos-curl.sh` para testar
3. Verifique os logs da API e do navegador

---

## 📄 Licença

Este projeto é parte da Landing Page Jyze.

