import { useEffect, useState, useRef } from "react";

interface Message {
  type: "client" | "bot" | "typing";
  name?: string;
  message?: string;
  time?: string;
  delay?: number;
  duration?: number;
}

const conversation: Message[] = [
  {
    type: "client",
    name: "Maria",
    message: "oi vcs estão abertos?",
    time: "19:45",
    delay: 1000,
  },
  {
    type: "typing",
    duration: 2000,
  },
  {
    type: "bot",
    name: "Alice - Sabor de Casa",
    message: `Oi! 😊 Sim, estamos abertos e funcionando normalmente!\n\nNosso horário hoje vai até 22h.\n⏰ Tempo de entrega atual: 50-70 minutos (movimento alto)\n\nPosso ajudar com seu pedido?`,
    time: "19:45",
    delay: 500,
  },
  {
    type: "client",
    name: "Maria",
    message: "quero 3 marmitas mas cada uma de um tipo pode?",
    time: "19:46",
    delay: 3000,
  },
  {
    type: "typing",
    duration: 1500,
  },
  {
    type: "bot",
    name: "Alice - Sabor de Casa",
    message: `Claro que pode! 😊 Sem problema nenhum!\n\nVocê pode escolher 3 marmitas diferentes do nosso cardápio.\nVou enviar as opções e você me diz qual quer de cada, ok?\n\n[envia cardápio completo]\n\nMe diga:\n• Marmita 1: qual prato e tamanho?\n• Marmita 2: qual prato e tamanho?\n• Marmita 3: qual prato e tamanho?`,
    time: "19:46",
    delay: 500,
  },
  {
    type: "client",
    name: "Maria",
    message: "1 strogonoff P, 1 frango grelhado M e 1 peixe M",
    time: "19:48",
    delay: 4000,
  },
  {
    type: "typing",
    duration: 2000,
  },
  {
    type: "bot",
    name: "Alice - Sabor de Casa",
    message: `Perfeito! Anotei tudo certinho! 📝\n\n*Seu pedido:*\n✅ 1x Strogonoff de Frango (P) - R$ 15,00\n✅ 1x Frango Grelhado (M) - R$ 17,00\n✅ 1x Peixe Assado (M) - R$ 21,00\n\n*Subtotal: R$ 53,00*\n\nGostaria de adicionar bebidas?`,
    time: "19:48",
    delay: 500,
  },
  {
    type: "client",
    name: "Maria",
    message: "não, só isso mesmo. mas vcs entregam no condominio verde valle?",
    time: "19:49",
    delay: 3000,
  },
  {
    type: "typing",
    duration: 1500,
  },
  {
    type: "bot",
    name: "Alice - Sabor de Casa",
    message: `Sim! Entregamos no Verde Valle! 🚚\n\nPara calcular a taxa certinha, preciso do endereço completo.\nPode me informar:\n• Bloco/Torre:\n• Número do apartamento:\n• Ponto de referência:`,
    time: "19:49",
    delay: 500,
  },
];

export const WhatsAppChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= conversation.length) {
      // Reiniciar a conversa após 3 segundos
      const resetTimer = setTimeout(() => {
        setMessages([]);
        setCurrentIndex(0);
        setIsTyping(false);
      }, 3000);
      return () => clearTimeout(resetTimer);
    }

    const currentMsg = conversation[currentIndex];
    const timer = setTimeout(
      () => {
        if (currentMsg.type === "typing") {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setCurrentIndex((prev) => prev + 1);
          }, currentMsg.duration || 2000);
        } else {
          setMessages((prev) => [...prev, currentMsg]);
          setCurrentIndex((prev) => prev + 1);
        }
      },
      currentMsg.delay || 500
    );

    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const formatMessage = (text: string) => {
    return text.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="whatsapp-container">
      {/* Status Bar */}
      <div className="whatsapp-status-bar">
        <span className="status-time">19:45</span>
        <div className="status-icons">
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path
              d="M1.5 6.5C1.5 4.29086 3.29086 2.5 5.5 2.5H11.5C13.7091 2.5 15.5 4.29086 15.5 6.5V10.5C15.5 12.7091 13.7091 14.5 11.5 14.5H5.5C3.29086 14.5 1.5 12.7091 1.5 10.5V6.5Z"
              fill="white"
              fillOpacity="0.4"
            />
          </svg>
          <span className="battery-percent">100%</span>
        </div>
      </div>

      {/* Header */}
      <div className="whatsapp-header">
        <div className="header-left">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="back-arrow"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="#E9EDEF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="avatar">
            <div className="avatar-img">🍽️</div>
          </div>
          <div className="header-info">
            <div className="contact-name">Sabor de Casa</div>
            <div className="contact-status">online</div>
          </div>
        </div>
        <div className="header-icons">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M17 10H19C20.1046 10 21 10.8954 21 12V17C21 18.1046 20.1046 19 19 19H17M17 10V19M17 10V7C17 5.89543 16.1046 5 15 5H9C7.89543 5 7 5.89543 7 7V17C7 18.1046 7.89543 19 9 19H15C16.1046 19 17 18.1046 17 17V19"
              stroke="#8696A0"
              strokeWidth="2"
            />
          </svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z"
              stroke="#8696A0"
              strokeWidth="2"
            />
          </svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="6" r="1.5" fill="#8696A0" />
            <circle cx="12" cy="12" r="1.5" fill="#8696A0" />
            <circle cx="12" cy="18" r="1.5" fill="#8696A0" />
          </svg>
        </div>
      </div>

      {/* Chat Area */}
      <div className="whatsapp-chat" ref={chatContainerRef}>
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-wrapper ${
                msg.type === "client" ? "message-client-wrapper" : "message-bot-wrapper"
              }`}
            >
              <div
                className={`message ${
                  msg.type === "client" ? "message-client" : "message-bot"
                }`}
              >
                <div className="message-text">{formatMessage(msg.message || "")}</div>
                <div className="message-meta">
                  <span className="message-time">{msg.time}</span>
                  {msg.type === "client" && (
                    <svg width="16" height="15" viewBox="0 0 16 15" className="check-icon">
                      <path
                        d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
                        fill="#53BDEB"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message-wrapper message-bot-wrapper">
              <div className="message message-bot typing-indicator-container">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div className="whatsapp-input-bar">
        <svg width="26" height="26" viewBox="0 0 26 26" className="input-icon">
          <path
            d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z"
            stroke="#8696A0"
            strokeWidth="2"
          />
          <path d="M9 13C9 13.8284 8.32843 14.5 7.5 14.5C6.67157 14.5 6 13.8284 6 13C6 12.1716 6.67157 11.5 7.5 11.5C8.32843 11.5 9 12.1716 9 13Z" fill="#8696A0" />
          <path d="M20 13C20 13.8284 19.3284 14.5 18.5 14.5C17.6716 14.5 17 13.8284 17 13C17 12.1716 17.6716 11.5 18.5 11.5C19.3284 11.5 20 12.1716 20 13Z" fill="#8696A0" />
          <path d="M9 17C9.5 18.5 11 19.5 13 19.5C15 19.5 16.5 18.5 17 17" stroke="#8696A0" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div className="input-field">
          <span>Mensagem</span>
        </div>
        <svg width="26" height="26" viewBox="0 0 26 26" className="input-icon">
          <path
            d="M15.5 7.5L19.5 7.5C20.6046 7.5 21.5 8.39543 21.5 9.5V19.5C21.5 20.6046 20.6046 21.5 19.5 21.5H9.5C8.39543 21.5 7.5 20.6046 7.5 19.5V15.5M16.5 4.5L16.5 12.5M16.5 4.5L12.5 8.5M16.5 4.5L20.5 8.5"
            stroke="#8696A0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg width="24" height="24" viewBox="0 0 24 24" className="input-icon">
          <path
            d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
            stroke="#8696A0"
            strokeWidth="2"
          />
          <path
            d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z"
            stroke="#8696A0"
            strokeWidth="2"
          />
        </svg>
        <svg width="24" height="24" viewBox="0 0 24 24" className="mic-icon">
          <path
            d="M12 1C10.3431 1 9 2.34315 9 4V12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12V4C15 2.34315 13.6569 1 12 1Z"
            fill="#8696A0"
          />
          <path
            d="M5 10V12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12V10"
            stroke="#8696A0"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M12 19V23" stroke="#8696A0" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 23H16" stroke="#8696A0" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <style>{`
        .whatsapp-container {
          width: 100%;
          max-width: 400px;
          height: 650px;
          background: #0B141A;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
          margin: 0 auto;
        }

        .whatsapp-status-bar {
          background: #005C4B;
          height: 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 12px;
          font-size: 12px;
          color: white;
          font-weight: 500;
        }

        .status-icons {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .battery-percent {
          font-size: 11px;
          margin-left: 2px;
        }

        .whatsapp-header {
          background: #202C33;
          padding: 10px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .back-arrow {
          cursor: pointer;
          flex-shrink: 0;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #00A884;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .avatar-img {
          font-size: 20px;
        }

        .header-info {
          flex: 1;
          min-width: 0;
        }

        .contact-name {
          color: #E9EDEF;
          font-size: 16px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .contact-status {
          color: #8696A0;
          font-size: 13px;
        }

        .header-icons {
          display: flex;
          gap: 20px;
          align-items: center;
          flex-shrink: 0;
        }

        .header-icons svg {
          cursor: pointer;
        }

        .whatsapp-chat {
          flex: 1;
          background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEUdKTUdKTUdKTUdKTUdKTUdKTUdKTUdKTUdKTX5qmVfAAAACHRSTlMCCgsTFRYXGNlsqJoAAACvSURBVHja7dVBDYAwDAXQLxCCE5ziBCc4wQkS0DQYSL+k+Xe7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+mZFTTYh1vN9vAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGCA22kP7wI4A3j+AWBeJoRnAGwAAAABJRU5ErkJggg==');
          background-color: #0B141A;
          background-size: 412.5px 749.25px;
          overflow-y: auto;
          padding: 12px 8px;
          scroll-behavior: smooth;
        }

        .messages-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .message-wrapper {
          display: flex;
          animation: messageAppear 0.3s ease-out;
        }

        @keyframes messageAppear {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .message-client-wrapper {
          justify-content: flex-end;
        }

        .message-bot-wrapper {
          justify-content: flex-start;
        }

        .message {
          max-width: 85%;
          padding: 6px 7px 8px 9px;
          border-radius: 7.5px;
          box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.13);
          position: relative;
        }

        .message-client {
          background: #005C4B;
          border-top-right-radius: 0;
          margin-left: auto;
        }

        .message-bot {
          background: #202C33;
          border-top-left-radius: 0;
        }

        .message-text {
          color: #E9EDEF;
          font-size: 14.2px;
          line-height: 19px;
          white-space: pre-wrap;
          word-wrap: break-word;
          margin-bottom: 2px;
        }

        .message-meta {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
          margin-top: 4px;
        }

        .message-time {
          color: #8696A0;
          font-size: 11px;
          line-height: 15px;
        }

        .check-icon {
          width: 16px;
          height: 15px;
          flex-shrink: 0;
        }

        .typing-indicator-container {
          padding: 12px 12px 10px 12px;
        }

        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #8696A0;
          animation: typingPulse 1.4s infinite;
        }

        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typingPulse {
          0%, 60%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          30% {
            transform: scale(1.3);
            opacity: 0.5;
          }
        }

        .whatsapp-input-bar {
          background: #202C33;
          padding: 5px 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .input-field {
          flex: 1;
          background: #2A3942;
          border-radius: 20px;
          padding: 10px 12px;
          color: #8696A0;
          font-size: 15px;
        }

        .input-icon {
          cursor: pointer;
          flex-shrink: 0;
        }

        .mic-icon {
          cursor: pointer;
          flex-shrink: 0;
        }

        /* Scrollbar styling */
        .whatsapp-chat::-webkit-scrollbar {
          width: 6px;
        }

        .whatsapp-chat::-webkit-scrollbar-track {
          background: transparent;
        }

        .whatsapp-chat::-webkit-scrollbar-thumb {
          background: rgba(134, 150, 160, 0.3);
          border-radius: 3px;
        }

        .whatsapp-chat::-webkit-scrollbar-thumb:hover {
          background: rgba(134, 150, 160, 0.5);
        }

        /* Responsividade */
        @media (max-width: 768px) {
          .whatsapp-container {
            max-width: 100%;
            height: 600px;
            border-radius: 0;
          }
        }

        @media (max-width: 480px) {
          .whatsapp-container {
            height: 550px;
          }

          .message {
            max-width: 90%;
          }

          .contact-name {
            font-size: 15px;
          }

          .message-text {
            font-size: 13.5px;
          }
        }
      `}</style>
    </div>
  );
};

export default WhatsAppChat;

