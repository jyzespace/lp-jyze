import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

// Ícone oficial do WhatsApp
const WhatsAppIcon = () => (
  <svg 
    viewBox="0 0 32 32" 
    className="whatsapp-icon"
    fill="currentColor"
  >
    <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-5.203 1.393 1.387-5.16-0.322-0.527c-1.331-2.217-2.034-4.768-2.034-7.344 0-7.384 6.007-13.391 13.391-13.391s13.391 6.007 13.391 13.391c0 7.384-6.007 13.391-13.391 13.391zM23.632 19.546c-0.385-0.192-2.267-1.117-2.618-1.245s-0.607-0.192-0.862 0.192c-0.256 0.385-0.991 1.245-1.213 1.501s-0.448 0.288-0.832 0.096c-0.385-0.192-1.621-0.597-3.087-1.903-1.142-1.016-1.913-2.269-2.136-2.654s-0.024-0.593 0.169-0.785c0.173-0.171 0.385-0.448 0.577-0.672s0.256-0.385 0.385-0.641c0.128-0.256 0.064-0.481-0.032-0.673s-0.862-2.075-1.181-2.84c-0.311-0.744-0.627-0.643-0.862-0.655-0.223-0.012-0.479-0.015-0.734-0.015s-0.671 0.096-1.021 0.481c-0.351 0.385-1.341 1.309-1.341 3.193s1.373 3.704 1.565 3.96c0.192 0.256 2.713 4.141 6.569 5.804 0.917 0.396 1.635 0.633 2.195 0.81 0.923 0.293 1.763 0.251 2.427 0.152 0.74-0.111 2.267-0.927 2.587-1.821s0.319-1.662 0.223-1.821c-0.096-0.159-0.351-0.256-0.736-0.448z"/>
  </svg>
);

const WhatsAppButton = ({ 
  phoneNumber = "5511999999999", 
  message = "Olá, quero saber mais sobre o Jyze Delivery!" 
}: WhatsAppButtonProps) => {
  const [isShaking, setIsShaking] = useState(false);
  const [showBalloon, setShowBalloon] = useState(false);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Efeito de tremor a cada 15 segundos
  useEffect(() => {
    const shakeInterval = setInterval(() => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 1000);
    }, 15000);

    return () => clearInterval(shakeInterval);
  }, []);

  // Balão de mensagem a cada 10 segundos
  useEffect(() => {
    const balloonInterval = setInterval(() => {
      setShowBalloon(true);
      setTimeout(() => setShowBalloon(false), 4000);
    }, 10000);

    // Mostra o balão após 3 segundos da página carregar
    setTimeout(() => {
      setShowBalloon(true);
      setTimeout(() => setShowBalloon(false), 4000);
    }, 3000);

    return () => clearInterval(balloonInterval);
  }, []);

  const closeBalloon = () => {
    setShowBalloon(false);
  };

  return (
    <>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px) rotate(-5deg); }
          20%, 40%, 60%, 80% { transform: translateX(5px) rotate(5deg); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes fadeInBounce {
          0% { opacity: 0; transform: scale(0.8) translateY(10px); }
          50% { transform: scale(1.05) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .whatsapp-button {
          position: fixed;
          bottom: calc(24px + env(safe-area-inset-bottom, 0px));
          right: 24px;
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
          transition: all 0.3s ease;
          z-index: 1000;
          border: none;
          text-decoration: none;
        }

        .whatsapp-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
        }

        .whatsapp-button.shake {
          animation: shake 1s ease-in-out;
        }

        .whatsapp-icon {
          color: white;
          width: 32px;
          height: 32px;
        }

        .whatsapp-balloon {
          position: fixed;
          bottom: calc(100px + env(safe-area-inset-bottom, 0px));
          right: 24px;
          background: white;
          padding: 12px 16px;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          z-index: 999;
          max-width: 250px;
          animation: fadeInBounce 0.5s ease-out, bounce 1.5s ease-in-out infinite 0.5s;
        }

        .whatsapp-balloon::after {
          content: "";
          position: absolute;
          bottom: -8px;
          right: 20px;
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid white;
        }

        .balloon-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .balloon-text {
          font-size: 14px;
          color: #333;
          font-weight: 500;
          line-height: 1.4;
        }

        .balloon-close {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          transition: color 0.2s;
          flex-shrink: 0;
        }

        .balloon-close:hover {
          color: #333;
        }

        @media (max-width: 768px) {
          .whatsapp-button {
            width: 56px;
            height: 56px;
            bottom: calc(20px + env(safe-area-inset-bottom, 0px));
            right: 20px;
          }

          .whatsapp-icon {
            width: 28px;
            height: 28px;
          }

          .whatsapp-balloon {
            bottom: calc(88px + env(safe-area-inset-bottom, 0px));
            right: 20px;
            max-width: 200px;
          }

          .balloon-text {
            font-size: 13px;
          }
        }
      `}</style>

      {/* Balão de mensagem */}
      {showBalloon && (
        <div className="whatsapp-balloon">
          <div className="balloon-content">
            <span className="balloon-text">
              Fale conosco no WhatsApp!
            </span>
            <button 
              className="balloon-close" 
              onClick={closeBalloon}
              aria-label="Fechar balão"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Botão do WhatsApp */}
      <a
        className={`whatsapp-button ${isShaking ? "shake" : ""}`}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </>
  );
};

export default WhatsAppButton;

