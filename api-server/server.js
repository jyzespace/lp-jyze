import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Armazena mensagens em memória (para produção use banco de dados)
let messages = [];
let messageId = 1;

// Armazena informações dos usuários conectados
let connectedUsers = new Map(); // sessionId -> { firstSeen, lastSeen, messageCount }

// Controle de fila por usuário (garante que as mensagens respeitem o delay e a ordem)
const userReleaseTimes = new Map(); // sessionId -> timestamp (ms)

// Endpoint para receber notificações do webhook (quando usuário envia mensagem)
app.post('/api/webhook-received', (req, res) => {
  const { sessionId, userId, message } = req.body;
  
  const userIdentifier = sessionId || userId;
  
  if (userIdentifier) {
    if (!connectedUsers.has(userIdentifier)) {
      connectedUsers.set(userIdentifier, {
        sessionId: userIdentifier,
        firstSeen: new Date().toISOString(),
        lastSeen: new Date().toISOString(),
        messageCount: 1,
        lastMessage: message || ''
      });
      console.log('👤 Novo usuário detectado:', userIdentifier);
    } else {
      const user = connectedUsers.get(userIdentifier);
      user.lastSeen = new Date().toISOString();
      user.messageCount++;
      user.lastMessage = message || user.lastMessage;
      console.log('👤 Usuário ativo:', userIdentifier, `(${user.messageCount} mensagens)`);
    }
  }
  
  res.json({ success: true, message: 'Webhook recebido' });
});

// Endpoint para receber mensagens de texto
app.post('/api/send-message', (req, res) => {
  const { message, sender, targetId, sessionId, typingDelay } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Mensagem é obrigatória' });
  }

  if (!targetId && !sessionId) {
    return res.status(400).json({ error: 'targetId ou sessionId é obrigatório. Use o ID do usuário que você quer enviar a mensagem.' });
  }

  const recipientId = targetId || sessionId;

  const normalizedDelay = Number(typingDelay);
  const delaySeconds = Number.isFinite(normalizedDelay) && normalizedDelay > 0 ? normalizedDelay : 0;

  const now = Date.now();
  const currentQueueTime = userReleaseTimes.get(recipientId) ?? now;
  const baseTime = Math.max(now, currentQueueTime);
  const releaseTimestamp = baseTime + delaySeconds * 1000;
  userReleaseTimes.set(recipientId, releaseTimestamp);

  const releaseTime = new Date(releaseTimestamp);

  const newMessage = {
    id: messageId++,
    type: 'text',
    role: 'assistant',
    content: message,
    sender: sender || 'API',
    targetId: recipientId,  // Para quem é a mensagem
    timestamp: new Date().toISOString(),
    releaseTime: releaseTime.toISOString(), // Quando pode ser enviada
    typingDelay: delaySeconds, // Quantos segundos de "digitando"
    read: false
  };

  messages.push(newMessage);
  
  console.log('📨 Nova mensagem para:', recipientId);
  console.log('⏰ Delay de digitação:', delaySeconds, 'segundos');
  console.log('📝 Conteúdo:', newMessage);
  
  res.json({ 
    success: true, 
    message: `Mensagem agendada para ${recipientId} (${delaySeconds}s de delay)`,
    data: newMessage
  });
});

// Endpoint para receber imagens
app.post('/api/send-image', (req, res) => {
  const { imageUrl, caption, sender, targetId, sessionId, typingDelay } = req.body;
  
  if (!imageUrl) {
    return res.status(400).json({ error: 'URL da imagem é obrigatória' });
  }

  if (!targetId && !sessionId) {
    return res.status(400).json({ error: 'targetId ou sessionId é obrigatório. Use o ID do usuário que você quer enviar a mensagem.' });
  }

  const recipientId = targetId || sessionId;

  const normalizedDelay = Number(typingDelay);
  const delaySeconds = Number.isFinite(normalizedDelay) && normalizedDelay > 0 ? normalizedDelay : 0;

  const now = Date.now();
  const currentQueueTime = userReleaseTimes.get(recipientId) ?? now;
  const baseTime = Math.max(now, currentQueueTime);
  const releaseTimestamp = baseTime + delaySeconds * 1000;
  userReleaseTimes.set(recipientId, releaseTimestamp);

  const releaseTime = new Date(releaseTimestamp);

  const newMessage = {
    id: messageId++,
    type: 'image',
    role: 'assistant',
    imageUrl: imageUrl,
    content: caption || '',
    sender: sender || 'API',
    targetId: recipientId,  // Para quem é a mensagem
    timestamp: new Date().toISOString(),
    releaseTime: releaseTime.toISOString(), // Quando pode ser enviada
    typingDelay: delaySeconds, // Quantos segundos de "digitando"
    read: false
  };

  messages.push(newMessage);
  
  console.log('🖼️ Nova imagem para:', recipientId);
  console.log('⏰ Delay de digitação:', delaySeconds, 'segundos');
  console.log('📝 URL:', imageUrl);
  
  res.json({ 
    success: true, 
    message: `Imagem agendada para ${recipientId} (${delaySeconds}s de delay)`,
    data: newMessage
  });
});

// Endpoint para buscar mensagens não lidas (filtra por sessionId)
app.get('/api/get-messages', (req, res) => {
  const { sessionId } = req.query;
  
  if (!sessionId) {
    return res.status(400).json({ 
      error: 'sessionId é obrigatório na query string',
      example: '/api/get-messages?sessionId=user_123456'
    });
  }

  const now = new Date();

  // Filtra mensagens não lidas destinadas a este usuário específico
  const allUserMessages = messages.filter(msg => !msg.read && msg.targetId === sessionId);
  
  // Separa mensagens prontas para enviar (releaseTime já passou)
  const readyMessages = allUserMessages.filter(msg => {
    if (!msg.releaseTime) return true; // Mensagens antigas sem delay
    return new Date(msg.releaseTime) <= now;
  });

  // Verifica se há mensagens ainda "digitando"
  const typingMessages = allUserMessages.filter(msg => {
    if (!msg.releaseTime) return false;
    return new Date(msg.releaseTime).getTime() > now.getTime();
  });

  const isTyping = typingMessages.length > 0;
  const nextReleaseTimestamp = typingMessages.reduce((min, msg) => {
    const ts = new Date(msg.releaseTime).getTime();
    return Math.min(min, ts);
  }, Number.POSITIVE_INFINITY);

  const nextMessageIn = isTyping
    ? Math.max(0, Math.ceil((nextReleaseTimestamp - now.getTime()) / 1000))
    : 0;
  
  // Marca como lidas apenas as mensagens prontas
  messages.forEach(msg => {
    if (msg.targetId === sessionId && !msg.read) {
      if (!msg.releaseTime || new Date(msg.releaseTime).getTime() <= now.getTime()) {
        msg.read = true;
      }
    }
  });

  if (!isTyping) {
    userReleaseTimes.delete(sessionId);
  } else {
    userReleaseTimes.set(sessionId, nextReleaseTimestamp);
  }
  
  res.json({ 
    success: true, 
    messages: readyMessages,
    count: readyMessages.length,
    isTyping: isTyping,
    nextMessageIn: nextMessageIn, // segundos até próxima mensagem
    sessionId: sessionId
  });
});

// Endpoint para limpar mensagens antigas (opcional)
app.delete('/api/clear-messages', (req, res) => {
  const count = messages.length;
  messages = [];
  messageId = 1;
  
  res.json({ 
    success: true, 
    message: `${count} mensagens foram limpas` 
  });
});

// Endpoint para listar todos os usuários conectados (sessionIds únicos)
app.get('/api/list-users', (req, res) => {
  const users = Array.from(connectedUsers.values());
  
  res.json({ 
    success: true,
    users: users,
    count: users.length,
    help: 'Use o campo sessionId de cada usuário como targetId para enviar mensagens'
  });
});

// Status da API
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'online',
    messagesCount: messages.length,
    uptime: process.uptime()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
  console.log(`📡 Endpoints disponíveis:`);
  console.log(`   POST http://localhost:${PORT}/api/send-message (requer targetId)`);
  console.log(`   POST http://localhost:${PORT}/api/send-image (requer targetId)`);
  console.log(`   GET  http://localhost:${PORT}/api/get-messages?sessionId=XXX`);
  console.log(`   GET  http://localhost:${PORT}/api/list-users (lista todos os IDs)`);
  console.log(`   GET  http://localhost:${PORT}/api/status`);
  console.log(``);
  console.log(`💡 IMPORTANTE: Use /api/list-users para ver os IDs disponíveis`);
});

