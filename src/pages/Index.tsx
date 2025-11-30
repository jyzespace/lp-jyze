import { useEffect, useRef, useState } from "react";
// CHAT JYZELI DESABILITADO - import type { KeyboardEvent } from "react";
// CHAT JYZELI DESABILITADO - import WhatsAppChat from "../components/WhatsAppChat";
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppButton from "../components/WhatsAppButton";
import FlowStep from "../components/FlowStep";
import FlowDetailPanel from "../components/FlowDetailPanel";
import ScreenshotCard from "../components/ScreenshotCard";
import ImageModal from "../components/ImageModal";
import fluxoVideo from "../../fluxo.mp4";
import jyzeVideo from "../../video.mp4";
import { 
  MessageSquare, 
  Printer, 
  CreditCard, 
  ClipboardList, 
  Truck, 
  BarChart3, 
  RefreshCw,
  Utensils,
  Beef,
  Pizza,
  Sandwich,
  ChefHat,
  Fish,
  Flame,
  Croissant,
  IceCream,
  Bus,
  CookingPot,
  ShoppingCart,
  ShoppingBasket,
  Coffee,
  CheckCircle2,
  XCircle,
  AlertCircle,
  X,
  Users,
  FileText,
  Sparkles,
  Brain,
  Network,
  TrendingUp,
  Award,
  ChevronDown
} from "lucide-react";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedFlowStep, setExpandedFlowStep] = useState<number | null>(() => {
    // No mobile, o primeiro card sempre começa aberto
    return typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : null;
  });
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);
  // CHAT JYZELI DESABILITADO
  // const [chatInput, setChatInput] = useState("");
  // const [chatMessages, setChatMessages] = useState<Array<{
  //   role: "user" | "assistant";
  //   content: string;
  //   imageUrl?: string;
  //   type?: string;
  // }>>([
  //   {
  //     role: "assistant",
  //     content: "Olá! Sou a Jyzeli. Como posso ajudar você hoje?",
  //   },
  // ]);
  // const [isChatTyping, setIsChatTyping] = useState(false);
  // const [quickQuestionsVisible, setQuickQuestionsVisible] = useState(true);
  // const chatEndRef = useRef<HTMLDivElement | null>(null);
  // const chatContainerRef = useRef<HTMLDivElement | null>(null);
  // const [isUserNearBottom, setIsUserNearBottom] = useState(true);
  // const [hasNewMessages, setHasNewMessages] = useState(false);
  // const previousMessageCountRef = useRef(chatMessages.length);
  // const [sessionId] = useState(() => {
  //   // Gera ou recupera ID único da sessão
  //   let id = localStorage.getItem('jyze_session_id');
  //   if (!id) {
  //     id = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  //     localStorage.setItem('jyze_session_id', id);
  //   }
  //   return id;
  // });

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    monthlyOrders: "",
    state: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // FAQ state
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  
  // Notification state
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error' | 'warning';
    message: string;
  }>({
    show: false,
    type: 'success',
    message: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Garante que o primeiro card sempre esteja aberto no mobile
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      if (isMobile && expandedFlowStep === null) {
        setExpandedFlowStep(0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [expandedFlowStep]);


  const navItems = [
    { href: "#inicio", label: "Início" },
    { href: "#solucoes", label: "Soluções" },
  ];

  const flowSteps = [
    {
      icon: MessageSquare,
      title: "Pedido Recebido",
      description: "Atendimento IA 24/7",
      fullDescription: "Assistente virtual inteligente que atende seus clientes 24 horas por dia, mesmo quando você está fechado. Processa pedidos, responde dúvidas e oferece sugestões automaticamente.",
      details: [
        "Disponível 24 horas por dia",
        "Atende múltiplos clientes simultaneamente",
        "Respostas instantâneas e precisas",
        "Nunca perde um pedido",
      ],
    },
    {
      icon: Printer,
      title: "Impressão Automática",
      description: "Comanda na cozinha",
      fullDescription: "Comandas impressas automaticamente na cozinha com todos os detalhes do pedido. Layout claro e organizado para facilitar a produção.",
      details: [
        "Impressão instantânea ao confirmar pedido",
        "Detalhamento completo de adicionais",
        "Observações especiais destacadas",
        "Layout personalizável",
      ],
    },
    {
      icon: CreditCard,
      title: "Pagamento Integrado",
      description: "PIX, cartão ou dinheiro",
      fullDescription: "Integração com múltiplas formas de pagamento: PIX, cartão de crédito/débito, dinheiro e vales-refeição.",
      details: [
        "PIX instantâneo",
        "Cartão de crédito/débito",
        "Dinheiro com cálculo de troco",
        "Vale-refeição/alimentação",
      ],
    },
    {
      icon: ClipboardList,
      title: "Produção e Contador",
      description: "Controle de tempo real",
      fullDescription: "Controle de tempo de produção, estimativas de entrega e organização da fila de pedidos para otimizar a operação.",
      details: [
        "Cronômetro por pedido",
        "Estimativa de tempo de entrega",
        "Organização de fila",
        "Priorização automática",
      ],
    },
    {
      icon: Truck,
      title: "Cálculo de Entrega",
      description: "Rota e frete otimizado",
      fullDescription: "Cálculo automático de frete baseado em distância, zona de entrega e políticas configuráveis. Otimização de rotas.",
      details: [
        "Cálculo automático por distância",
        "Definição de zonas de entrega",
        "Frete grátis configurável",
        "Otimização de rotas",
      ],
    },
    {
      icon: BarChart3,
      title: "Analytics em Tempo Real",
      description: "Métricas e insights",
      fullDescription: "Dashboards completos com análises de vendas, produtos mais vendidos, horários de pico e performance financeira em tempo real.",
      details: [
        "Vendas em tempo real",
        "Produtos mais populares",
        "Análise de horários de pico",
        "Métricas de performance",
      ],
    },
    {
      icon: RefreshCw,
      title: "Recuperação de Vendas",
      description: "Reengajamento automático",
      fullDescription: "Sistema inteligente que identifica carrinhos abandonados e envia mensagens automáticas para recuperar vendas perdidas.",
      details: [
        "Detecção de carrinho abandonado",
        "Mensagens automáticas de recuperação",
        "Ofertas personalizadas",
        "Aumento da taxa de conversão",
      ],
    },
  ];

  const businessTypes = [
    {
      icon: Utensils,
      name: "Restaurantes tradicionais",
    },
    {
      icon: Beef,
      name: "Fast food",
    },
    {
      icon: Pizza,
      name: "Pizzarias",
    },
    {
      icon: Sandwich,
      name: "Lanchonetes",
    },
    {
      icon: ChefHat,
      name: "Hamburguerias",
    },
    {
      icon: Fish,
      name: "Sushihouses",
    },
    {
      icon: Flame,
      name: "Churrascarias",
    },
    {
      icon: Croissant,
      name: "Padarias e confeitarias",
    },
    {
      icon: IceCream,
      name: "Açaí e sorveterias",
    },
    {
      icon: Bus,
      name: "Food trucks",
    },
    {
      icon: CookingPot,
      name: "Dark kitchens",
    },
    {
      icon: ShoppingCart,
      name: "Supermercados",
    },
    {
      icon: ShoppingBasket,
      name: "Empórios e delicatessens",
    },
    {
      icon: Coffee,
      name: "Cafeterias",
    },
  ];

  const plans = [
    {
      name: "Plano Start",
      setup: "R$ 799 implantação",
      idealFor: "Ideal para lanchonetes, pizzarias e pequenos negócios",
      stats: [
        "Até 600 pedidos/mês",
        "4.000 requisições/mês",
        "Até 3 usuários",
      ],
      annual: {
        headline: "R$ 559/mês",
        subheadline: "Assinatura anual",
      },
      monthly: {
        headline: "R$ 649/mês",
        subheadline: "Plano mensal",
      },
      includedFeatures: [
        "Atendimento automatizado via WhatsApp",
        "Chatbot natural com sotaque regional",
        "Impressão automática de pedidos",
        "Painel de pedidos em tempo real",
        "Relatórios e métricas básicas",
        "Painel Analytics em tempo real",
        "Relatórios de vendas, mensagens e clientes",
        "IA otimizada para atendimento rápido",
        "Cálculo automático de frete",
        "IA inteligente que aprende o seu atendimento",
        "Pagamentos integrados (PIX, cartão, Mercado Pago)",
        "Cálculo de tempo médio de entrega",
        "Suporte online",
      ],
      cta: "Contratar",
      highlighted: false,
    },
    {
      name: "Plano Scale",
      setup: "R$ 1199 implantação",
      tag: "Mais Popular",
      idealFor: "Ideal para operações que querem escalar sem aumentar time",
      stats: [
        "Até 1.000 pedidos/mês",
        "8.000 requisições/mês",
        "Até 5 usuários",
      ],
      annual: {
        headline: "R$ 949/mês",
        subheadline: "Assinatura anual",
      },
      monthly: {
        headline: "R$ 1059/mês",
        subheadline: "Plano mensal",
      },
      includedFeatures: [
        "Atendimento automatizado via WhatsApp",
        "Chatbot natural com sotaque regional",
        "Impressão automática de pedidos",
        "Painel de pedidos em tempo real",
        "Relatórios e métricas básicas",
        "Painel Analytics em tempo real",
        "Relatórios de vendas, mensagens e clientes",
        "IA otimizada para atendimento rápido",
        "Cálculo automático de frete",
        "IA inteligente que aprende o seu atendimento",
        "Pagamentos integrados (PIX, cartão, Mercado Pago)",
        "Cálculo de tempo médio de entrega",
        "Suporte online",
        "Suporte prioritário",
      ],
      cta: "Contratar",
      highlighted: true,
    },
    {
      name: "Plano Pro",
      setup: "R$ 1799 implantação",
      idealFor: "Ideal para múltiplas unidades e alto volume de pedidos",
      stats: [
        "Até 2.000 pedidos/mês",
        "15.000 requisições/mês",
        "Até 10 usuários",
      ],
      annual: {
        headline: "R$ 1399/mês",
        subheadline: "Assinatura anual",
      },
      monthly: {
        headline: "R$ 1499/mês",
        subheadline: "Plano mensal",
      },
      includedFeatures: [
        "Atendimento automatizado via WhatsApp",
        "Chatbot natural com sotaque regional",
        "Impressão automática de pedidos",
        "Painel de pedidos em tempo real",
        "Relatórios e métricas básicas",
        "Painel Analytics em tempo real",
        "Relatórios de vendas, mensagens e clientes",
        "IA otimizada para atendimento rápido",
        "Cálculo automático de frete",
        "IA inteligente que aprende o seu atendimento",
        "Pagamentos integrados (PIX, cartão, Mercado Pago)",
        "Cálculo de tempo médio de entrega",
        "Suporte online",
        "Suporte prioritário",
        "Suporte Premium dedicado",
      ],
      cta: "Contratar",
      highlighted: false,
    },
    {
      name: "Plano Enterprise",
      setup: "Sob medida",
      idealFor: "Ideal para redes e grupos que buscam padronização em escala",
      stats: [
        "Consultoria dedicada",
        "Implantação customizada",
        "Roadmap conjunto com seu time",
      ],
      annual: {
        headline: "Valores personalizados",
        subheadline: "Consultoria dedicada",
      },
      monthly: {
        headline: "Implantação customizada",
        subheadline: "Project kickoff",
      },
      includedFeatures: [
        "Atendimento automatizado via WhatsApp",
        "Chatbot natural com sotaque regional",
        "Impressão automática de pedidos",
        "Painel de pedidos em tempo real",
        "Relatórios e métricas básicas",
        "Painel Analytics em tempo real",
        "Relatórios de vendas, mensagens e clientes",
        "IA otimizada para atendimento rápido",
        "Cálculo automático de frete",
        "IA inteligente que aprende o seu atendimento",
        "Pagamentos integrados (PIX, cartão, Mercado Pago)",
        "Cálculo de tempo médio de entrega",
        "Suporte online",
        "Suporte prioritário",
        "Suporte Premium dedicado",
        "Arquitetura corporativa sob demanda",
        "SLA dedicado",
        "Roadmap conjunto e governança de dados",
      ],
      cta: "Contratar",
      highlighted: false,
    },
  ];

  const allPlanFeatures = [
    "Atendimento automatizado via WhatsApp",
    "Chatbot natural com sotaque regional",
    "Impressão automática de pedidos",
    "Painel de pedidos em tempo real",
    "Relatórios e métricas básicas",
    "Painel Analytics em tempo real",
    "Relatórios de vendas, mensagens e clientes",
    "IA otimizada para atendimento rápido",
    "IA inteligente que aprende o seu atendimento",
    "Pagamentos integrados (PIX, cartão, Mercado Pago)",
    "Cálculo automático de frete",
    "Cálculo de tempo médio de entrega",
    "Suporte online",
    "Suporte prioritário",
    "Suporte Premium dedicado",
    "Arquitetura corporativa sob demanda",
    "SLA dedicado",
    "Roadmap conjunto e governança de dados",
  ];

  // Links de checkout por plano e ciclo de faturamento
  const checkoutLinks: Record<string, { annual: string; monthly: string }> = {
    "Plano Start": {
      annual: "https://pay.kiwify.com.br/REZq4Ze",
      monthly: "https://pay.kiwify.com.br/90XtAG0",
    },
    "Plano Scale": {
      annual: "https://pay.kiwify.com.br/2AdAfAU",
      monthly: "https://pay.kiwify.com.br/EzYBO8m",
    },
    "Plano Pro": {
      annual: "https://pay.kiwify.com.br/FNFS2of",
      monthly: "https://pay.kiwify.com.br/Z2zKXTa",
    },
  };

  const planBonus = [
    "Robô que melhora com o tempo",
    "Painel com todas as vendas e mensagens em um só lugar",
    "Cadastramento de produtos a partir de imagens",
    "Impressão automática dos pedidos",
    "Assistente inteligente para relatórios e dúvidas",
  ];

  // CHAT JYZELI DESABILITADO
  // useEffect(() => {
  //   const container = chatContainerRef.current;
  //   if (!container) return;
  //
  //   const handleScroll = () => {
  //     const distanceToBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
  //     setIsUserNearBottom(distanceToBottom <= 80);
  //   };
  //
  //   container.addEventListener("scroll", handleScroll, { passive: true });
  //   handleScroll();
  //
  //   return () => {
  //     container.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  //
  // useEffect(() => {
  //   const container = chatContainerRef.current;
  //   if (!container) return;
  //
  //   const currentCount = chatMessages.length;
  //   const previousCount = previousMessageCountRef.current;
  //
  //   if (currentCount > previousCount) {
  //     if (isUserNearBottom) {
  //       const targetScrollTop = container.scrollHeight - container.clientHeight;
  //       container.scrollTo({ top: targetScrollTop, behavior: "smooth" });
  //     } else {
  //       setHasNewMessages(true);
  //     }
  //   }
  //
  //   previousMessageCountRef.current = currentCount;
  // }, [chatMessages, isUserNearBottom]);
  //
  // useEffect(() => {
  //   if (isUserNearBottom) {
  //     setHasNewMessages(false);
  //     const container = chatContainerRef.current;
  //     if (container) {
  //       const targetScrollTop = container.scrollHeight - container.clientHeight;
  //       container.scrollTo({ top: targetScrollTop, behavior: "smooth" });
  //     }
  //   }
  // }, [isUserNearBottom]);
  //
  // // Busca mensagens da API a cada 2 segundos
  // useEffect(() => {
  //   console.log('🔑 Seu Session ID:', sessionId);
  //   
  //   const fetchMessages = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:3001/api/get-messages?sessionId=${sessionId}`);
  //       const data = await response.json();
  //       
  //       if (data.success) {
  //         console.log('📡 API Response:', { 
  //           isTyping: data.isTyping, 
  //           nextMessageIn: data.nextMessageIn,
  //           messagesCount: data.count 
  //         });
  //
  //         // Atualiza indicador de "digitando" se a API estiver processando mensagem
  //         if (data.isTyping) {
  //           setIsChatTyping(true);
  //           console.log('⏳ IA digitando... próxima mensagem em', data.nextMessageIn, 'segundos');
  //         } else {
  //           setIsChatTyping(false);
  //         }
  //
  //         // Adiciona novas mensagens
  //         if (data.messages.length > 0) {
  //           console.log('📬 Recebidas', data.count, 'mensagens da API');
  //           
  //           data.messages.forEach((rawMessage: any) => {
  //             const normalizeMessage = (messageCandidate: any) => {
  //               if (!messageCandidate || typeof messageCandidate !== "object") {
  //                 return messageCandidate;
  //               }
  //
  //               if (messageCandidate.data && typeof messageCandidate.data === "object") {
  //                 return { ...messageCandidate, ...messageCandidate.data };
  //               }
  //
  //               if (messageCandidate.message && typeof messageCandidate.message === "object") {
  //                 return { ...messageCandidate, ...messageCandidate.message };
  //               }
  //
  //               return messageCandidate;
  //             };
  //
  //             const message = normalizeMessage(rawMessage);
  //
  //             const getStringCandidate = (...candidates: unknown[]) => {
  //               for (const candidate of candidates) {
  //                 if (typeof candidate === "string" && candidate.trim().length > 0) {
  //                   return candidate.trim();
  //                 }
  //               }
  //               return undefined;
  //             };
  //
  //             const possibleContent = getStringCandidate(
  //               message?.content,
  //               message?.caption,
  //               message?.text,
  //               message?.body,
  //               message?.message,
  //               message?.description
  //             ) ?? "";
  //
  //             const gatherUrlCandidates = (...sources: unknown[]) => {
  //               const urls = new Set<string>();
  //               const addIfValid = (value?: string) => {
  //                 if (!value) return;
  //                 
  //                 // Divide por quebras de linha (\n, \r), vírgulas e espaços
  //                 const parts = value.split(/[\n\r,]+/).map(p => p.trim()).filter(Boolean);
  //                 
  //                 parts.forEach((part) => {
  //                   // Tenta primeiro a parte inteira
  //                   try {
  //                     const url = new URL(part);
  //                     urls.add(url.toString());
  //                     return;
  //                   } catch {
  //                     // Se falhar, tenta dividir por espaços também
  //                     part.split(/\s+/).forEach((subpart) => {
  //                       const trimmed = subpart.trim();
  //                       if (!trimmed) return;
  //                       try {
  //                         const url = new URL(trimmed);
  //                         urls.add(url.toString());
  //                       } catch {
  //                         // ignora se não for URL válida
  //                       }
  //                     });
  //                   }
  //                 });
  //               };
  //
  //               sources.forEach((source) => {
  //                 if (typeof source === "string") {
  //                   addIfValid(source);
  //                 }
  //
  //                 if (Array.isArray(source)) {
  //                   source.forEach((item) => {
  //                     if (typeof item === "string") addIfValid(item);
  //                     if (item && typeof item === "object" && typeof item.url === "string") addIfValid(item.url);
  //                   });
  //                 }
  //
  //                 if (source && typeof source === "object" && typeof (source as { url?: string }).url === "string") {
  //                   addIfValid((source as { url?: string }).url);
  //                 }
  //               });
  //
  //               return Array.from(urls);
  //             };
  //
  //             const candidateUrls = gatherUrlCandidates(
  //               message?.imageUrl,
  //               message?.image_url,
  //               message?.image,
  //               message?.images,
  //               message?.mediaUrl,
  //               message?.media_url,
  //               message?.media?.url,
  //               message?.media,
  //               Array.isArray(message?.media) ? message.media : undefined,
  //               message?.attachments,
  //               message?.files,
  //               message?.fileUrl,
  //               message?.file_url,
  //               message?.urls,
  //               possibleContent
  //             );
  //
  //             const rawType = typeof message?.type === "string" ? message.type.toLowerCase() : "";
  //
  //             const resolvedType = (() => {
  //               if (rawType.includes("image")) return "image";
  //               if (rawType.includes("photo")) return "image";
  //               if (rawType includes("media") && candidateUrls.length > 0) return "image";
  //               if (candidateUrls.length > 0) return "image";
  //               return "text";
  //             })();
  //
  //             let caption = possibleContent;
  //             candidateUrls.forEach((url) => {
  //               caption = caption.replace(url, "").trim();
  //             });
  //
  //             const normalizedMessages: Array<{ role: "assistant"; content: string; imageUrl?: string; type?: string }> = [];
  //
  //             if (candidateUrls.length > 0) {
  //               candidateUrls.forEach((url, index) => {
  //                 normalizedMessages.push({
  //                   role: "assistant",
  //                   type: "image",
  //                   imageUrl: url,
  //                   content: index === 0 ? caption : "",
  //                 });
  //               });
  //             }
  //
  //             if ((resolvedType === "text" || caption) && (caption?.length ?? 0) > 0 && candidateUrls.length === 0) {
  //               normalizedMessages.push({
  //                 role: "assistant",
  //                 type: "text",
  //                 content: caption,
  //               });
  //             }
  //
  //             if (normalizedMessages.length === 0) {
  //               normalizedMessages.push({
  //                 role: "assistant",
  //                 type: resolvedType,
  //                 content: caption,
  //                 imageUrl: candidateUrls[0],
  //               });
  //             }
  //
  //             normalizedMessages.forEach((normalizedMessage) => {
  //               console.log("📨 Mensagem normalizada:", normalizedMessage);
  //               
  //               // Filtra mensagens vazias
  //               const hasContent = normalizedMessage.content && normalizedMessage.content.trim().length > 0;
  //               const hasImage = normalizedMessage.imageUrl && normalizedMessage.imageUrl.trim().length > 0;
  //               
  //               // Só adiciona se tiver conteúdo OU imagem
  //               if (!hasContent && !hasImage) {
  //                 console.log("⚠️ Mensagem vazia ignorada");
  //                 return;
  //               }
  //               
  //               // Não adiciona imagem sem URL válida
  //               if (normalizedMessage.type === "image" && !hasImage) {
  //                 console.log("⚠️ Imagem sem URL ignorada");
  //                 return;
  //               }
  //               
  //               setChatMessages((prev) => [...prev, normalizedMessage]);
  //             });
  //           });
  //         }
  //       }
  //     } catch (error) {
  //       // API não está rodando, ignora silenciosamente
  //     }
  //   };
  //
  //   // Busca imediatamente
  //   fetchMessages();
  //
  //   // Depois busca a cada 2 segundos (mais responsivo)
  //   const interval = setInterval(fetchMessages, 2000);
  //
  //   return () => clearInterval(interval);
  // }, [sessionId]);
  //
  // const sendChatMessage = async (overrideMessage?: string) => {
  //   const trimmedMessage = (overrideMessage ?? chatInput).trim();
  //   if (!trimmedMessage) return;
  //
  //   const userMessage = { role: "user", content: trimmedMessage } as const;
  //   setChatMessages((prev) => [...prev, userMessage]);
  //   if (!overrideMessage) {
  //     setChatInput("");
  //   }
  //
  //   // Envia INSTANTANEAMENTE para o webhook (fire-and-forget, não espera resposta)
  //   const webhookData = {
  //     sessionId: sessionId,  // ID ÚNICO DO USUÁRIO
  //     userId: sessionId,     // ID ÚNICO DO USUÁRIO (alias)
  //     message: trimmedMessage,
  //     mensagem: trimmedMessage,
  //     texto: trimmedMessage,
  //     content: trimmedMessage,
  //     timestamp: new Date().toISOString(),
  //     data: new Date().toLocaleString('pt-BR'),
  //     userAgent: navigator.userAgent,
  //     origem: "Landing Page Jyze",
  //     tipo: "chat_jyzeli",
  //     url: window.location.href
  //   };
  //   
  //   console.log("🚀 Enviando para webhook com Session ID:", sessionId);
  //   console.log("📦 Dados:", webhookData);
  //   
  //   // Fire-and-forget para o webhook n8n
  //   fetch("https://n8n.locusup.shop/webhook-test/jyze_chat", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },
  //     body: JSON.stringify(webhookData),
  //     keepalive: true
  //   }).then(r => console.log("✅ Webhook n8n:", r.status)).catch(e => console.log("⚠️ Erro webhook:", e));
  //
  //   // Também registra o usuário na API local
  //   fetch("http://localhost:3001/api/webhook-received", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(webhookData)
  //   }).catch(() => {}); // Ignora erro se API local não estiver rodando
  //
  //   // NÃO controla mais o "digitando" localmente - deixa a API controlar
  //   // A API vai retornar as mensagens com o delay configurado
  // };
  //
  // const handleChatKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (event.key === "Enter" && !event.shiftKey) {
  //     event.preventDefault();
  //     void sendChatMessage();
  //   }
  // };
  //
  // const handleQuickQuestion = (question: string) => {
  //    setQuickQuestionsVisible(false);
  //    setChatInput("");
  //    void sendChatMessage(question);
  // };

  // Função para formatar telefone brasileiro
  const formatPhone = (value: string): string => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos (DDD + 9 dígitos)
    const limitedNumbers = numbers.slice(0, 11);
    
    // Aplica a máscara
    if (limitedNumbers.length <= 2) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 7) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
    } else if (limitedNumbers.length <= 10) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 6)}-${limitedNumbers.slice(6)}`;
    } else {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7, 11)}`;
    }
  };

  // Função para permitir apenas números
  const allowOnlyNumbers = (value: string): string => {
    return value.replace(/\D/g, '');
  };

  // Função para exibir notificação
  const showNotification = (type: 'success' | 'error' | 'warning', message: string) => {
    setNotification({ show: true, type, message });
  };

  // Esconder notificação automaticamente após 5 segundos
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Aplicar validações específicas por campo
    if (name === 'phone') {
      // Formatar telefone com máscara
      const formattedPhone = formatPhone(value);
      setFormData((prev) => ({ ...prev, [name]: formattedPhone }));
    } else if (name === 'monthlyOrders') {
      // Permitir apenas números no campo de pedidos mensais
      const numbersOnly = allowOnlyNumbers(value);
      setFormData((prev) => ({ ...prev, [name]: numbersOnly }));
    } else {
      // Outros campos sem validação especial
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validar telefone (deve ter pelo menos 10 dígitos)
      const phoneNumbers = formData.phone.replace(/\D/g, '');
      if (phoneNumbers.length < 10) {
        showNotification('warning', 'Por favor, insira um telefone válido com DDD (mínimo 10 dígitos).');
        setIsSubmitting(false);
        return;
      }

      // URL direta do webhook do formulário
      const webhookUrl = 'https://webhook.saborpaulista.site/webhook/formulario';
      
      // Preparar os dados do formulário
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.companyName,
        monthlyOrders: formData.monthlyOrders,
        state: formData.state,
        timestamp: new Date().toISOString(),
        origem: "Landing Page Jyze Delivery",
        url: typeof window !== "undefined" ? window.location.href : "",
      };

      console.log("Enviando dados para webhook:", payload);

      // Enviar para o webhook com request simples (evita preflight CORS)
      const formBody = new URLSearchParams();
      Object.entries(payload).forEach(([key, value]) => {
        formBody.append(key, value ?? "");
      });

      const response = await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors', // evita bloqueio CORS no navegador
        body: formBody,
      });

      const isOpaque = response.type === "opaque";
      const isSuccessful = response.ok || isOpaque;

      console.log("Status da resposta:", response.status, "opaque:", isOpaque);

      // Verificar se o envio foi bem-sucedido
      let responseText = "";
      if (!isOpaque) {
        try {
          responseText = await response.text();
          console.log("Resposta do servidor:", responseText);
        } catch (readError) {
          console.error("Erro ao ler resposta:", readError);
        }
      } else {
        console.log("Resposta opaca (no-cors); assumindo sucesso se não houve bloqueio de rede.");
      }

      if (!isSuccessful) {
        throw new Error(`Erro ${response.status}: ${responseText || response.statusText}`);
      }

      // Limpar formulário após envio bem-sucedido
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        monthlyOrders: "",
        state: "",
      });

      setIsSubmitting(false);
      showNotification('success', 'Formulário enviado com sucesso! Em breve entraremos em contato.');
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setIsSubmitting(false);
      
      // Verificar tipo de erro para mensagem mais específica
      if (error instanceof TypeError) {
        if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
          showNotification('error', 'Erro de conexão. Verifique sua internet ou tente novamente.');
        } else {
          showNotification('error', `Erro: ${error.message}. Por favor, tente novamente.`);
        }
      } else {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        showNotification('error', `Erro ao enviar o formulário: ${errorMessage}. Por favor, tente novamente.`);
      }
    }
  };

  const brazilianStates = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", 
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", 
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  // CHAT JYZELI DESABILITADO
  // const quickQuestions = [
  //   "Como funciona a integração com o WhatsApp?",
  //   "Preciso de conhecimento técnico para configurar?",
  //   "E se a IA não souber responder algo?",
  //   "Posso cancelar quando quiser?",
  // ];

  const faqs = [
    {
      question: "A IA realmente atende meus clientes sozinha?",
      answer:
        "Sim. A IA da Jyze realiza todo o fluxo: conversa, tira pedidos, gera pagamentos, envia cardápios com imagens ou link e acompanha o status — tudo de forma automática e humanizada.",
    },
    {
      question: "E se o cliente precisar de ajuda humana?",
      answer:
        "Quando a IA identifica dúvidas mais complexas, ela chama automaticamente um atendente humano para assumir a conversa, garantindo qualidade em 100% das interações.",
    },
    {
      question: "A IA funciona 24 horas por dia?",
      answer:
        "Sim. A assistente inteligente da Jyze trabalha 24h/7, garantindo atendimento constante e sem filas.",
    },
    {
      question: "A IA calcula rotas de entrega?",
      answer:
        "Calcula sim. Ela gera a melhor rota com base no GPS e na localização do cliente, otimizando tempo e custos de entrega.",
    },
    {
      question: "O sistema faz análise de desempenho?",
      answer:
        "A IA analisa dados das vendas, atendimento e operação, gerando insights automáticos para melhorar o desempenho do seu delivery.",
    },
    {
      question: "Preciso instalar algum app adicional?",
      answer:
        "Não. A Jyze funciona totalmente integrada no seu ambiente atual, sem necessidade de múltiplas ferramentas.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/60 bg-white/75 shadow-[0_20px_40px_rgba(15,23,42,0.06)] backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 md:px-6">
          <a href="#inicio" className="flex items-center gap-3">
            <img 
              src="/images/Logo.png" 
              alt="Jyze Delivery" 
              className="h-16 w-auto max-h-full"
            />
          </a>
          <nav className="hidden items-center gap-9 text-sm font-medium text-slate-600 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative transition-colors duration-200 hover:text-slate-900"
              >
                <span className="relative after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-brand-primary after:to-brand-cyan after:transition-[width] after:duration-300 hover:after:w-full">
                  {item.label}
                </span>
              </a>
            ))}
            <span className="hidden h-4 w-px bg-slate-200/80 lg:block" aria-hidden="true" />
            <a
              href="https://wa.me/554598290794?text=Olá%2C%20quero%20saber%20mais%20sobre%20o%20Jyze%20Delivery!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-primary via-brand-aqua to-brand-cyan px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(79,70,229,0.25)] transition hover:shadow-[0_20px_35px_rgba(79,70,229,0.3)]"
            >
              Falar com especialista
            </a>
          </nav>
          <button
            type="button"
            aria-label="Abrir menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-700 shadow-sm md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span className="sr-only">Abrir menu</span>
            <div className="space-y-1.5">
              <span className="block h-0.5 w-6 bg-slate-800" />
              <span className="block h-0.5 w-6 bg-slate-800" />
              <span className="block h-0.5 w-6 bg-slate-800" />
            </div>
          </button>
        </div>
        {mobileMenuOpen && (
          <nav className="border-t border-slate-200 bg-white/95 px-4 py-4 text-sm font-medium text-slate-600 shadow-lg md:hidden">
            <div className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-3 py-2 transition hover:bg-slate-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="https://wa.me/554598290794?text=Olá%2C%20quero%20saber%20mais%20sobre%20o%20Jyze%20Delivery!"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-md bg-gradient-to-r from-brand-primary via-brand-aqua to-brand-cyan px-3 py-2 text-center text-white shadow"
                onClick={() => setMobileMenuOpen(false)}
              >
                Falar com especialista
              </a>
            </div>
          </nav>
        )}
      </header>

      <main className="pt-16 md:pt-20">
        <section id="inicio" className="bg-slate-950 text-white">
          <div className="mx-auto max-w-6xl px-4 pb-24 pt-16 md:px-6">
            <div className="space-y-20">
              <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
                <div className="flex-1 space-y-8" data-animate>
                  <span className="inline-flex items-center gap-3 rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300">
                    Atendimento automático humanizado
                  </span>
                  <div className="space-y-6">
                    <h1 className="text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
                      Transforme seu <span className="bg-gradient-to-r from-brand-primary via-brand-aqua to-brand-cyan bg-clip-text text-transparent">WhatsApp</span> em uma Máquina de <span className="bg-gradient-to-r from-brand-primary via-brand-aqua to-brand-cyan bg-clip-text text-transparent">Vendas Automáticas</span><br className="hidden sm:block" /> com IA e Gestão Completa
                    </h1>
                    <p className="max-w-xl text-base text-slate-300 leading-7 md:leading-8">
                      Deixe a Inteligencia Artificial cuidar das conversas, integração com a cozinha, pagamentos e relatórios.<br className="hidden sm:block" /> Você foca apenas em gerenciar e encantar clientes.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                      href="#contato"
                      className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                    >
                      Solicitar demonstração
                    </a>
                  </div>
                  <dl className="grid gap-6 text-xs uppercase tracking-[0.2em] text-white/60 sm:grid-cols-3">
                    <div>
                      <dt className="text-white/40">Pedidos automatizados</dt>
                      <dd className="mt-1 text-lg font-semibold text-white">100%</dd>
                    </div>
                    <div>
                      <dt className="text-white/40">Tempo médio para operar</dt>
                      <dd className="mt-1 text-lg font-semibold text-white">14 dias</dd>
                    </div>
                    <div>
                      <dt className="text-white/40">Recuperação de vendas</dt>
                      <dd className="mt-1 text-lg font-semibold text-white">+18%</dd>
                    </div>
                  </dl>
                </div>
                <div
                  className="flex-1 flex justify-center lg:justify-end"
                  data-animate
                  style={{ transitionDelay: "120ms" }}
                >
                  <div className="relative w-full max-w-[21rem] overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-brand-aqua/10 to-transparent opacity-80"
                      aria-hidden="true"
                    />
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-slate-950/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
                      <span
                        className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_5px_rgba(52,211,153,0.25)]"
                        aria-hidden="true"
                      />
                      Fluxo real no WhatsApp
                    </div>
                    <video
                      src={fluxoVideo}
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="relative block aspect-[9/16] w-full object-cover"
                      aria-label="Demonstração do fluxo de atendimento via WhatsApp com IA"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="solucoes" className="bg-white px-8 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 space-y-4 text-center" data-animate>
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                Do Pedido à Entrega, Tudo em um Único Fluxo
              </h2>
              <p className="mx-auto max-w-2xl text-base text-slate-600">
                Veja como o sistema integra cada etapa do seu delivery
              </p>
            </div>

            {/* Timeline Desktop (horizontal) e Mobile (vertical) */}
            <div className="relative">
              <div className="grid gap-12 lg:grid-cols-7 lg:gap-6">
                {flowSteps.map((step, idx) => (
                  <FlowStep
                    key={idx}
                    icon={step.icon}
                    title={step.title}
                    description={step.description}
                    fullDescription={step.fullDescription}
                    details={step.details}
                    index={idx}
                    isLast={idx === flowSteps.length - 1}
                    isExpanded={expandedFlowStep === idx}
                    isSelected={expandedFlowStep === idx}
                    onToggle={() => setExpandedFlowStep(expandedFlowStep === idx ? null : idx)}
                  />
                ))}

                {/* Painel de detalhes - apenas desktop */}
                {expandedFlowStep !== null && (
                  <div className="hidden lg:block lg:col-span-7">
                    <FlowDetailPanel
                      icon={flowSteps[expandedFlowStep].icon}
                      title={flowSteps[expandedFlowStep].title}
                      fullDescription={flowSteps[expandedFlowStep].fullDescription || ""}
                      details={flowSteps[expandedFlowStep].details || []}
                      onClose={() => setExpandedFlowStep(null)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Seção Configuração e Aprendizado do Agente */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              {/* Coluna esquerda - Textos */}
              <div className="space-y-8" data-animate>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
                    Um agente que aprende com você
                  </h2>
                  <p className="text-lg text-slate-600 md:text-xl">
                    Configuramos seu agente para falar como sua marca e entender a rotina do seu negócio — do primeiro "oi" até o fechamento do pedido.
                  </p>
                </div>

                <div className="space-y-4 text-slate-700">
                  <p>
                    Nosso processo de configuração é feito lado a lado com você.
                  </p>
                  <p>
                    Realizamos reuniões para compreender a operação do seu restaurante, analisamos conversas reais e definimos juntos o estilo ideal de comunicação.
                  </p>
                  <p>
                    Em poucos dias, seu agente aprende a atender com eficiência e no tom certo — como se fosse um membro da sua equipe.
                  </p>
                </div>

                <a
                  href="#contato"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-primary via-brand-aqua to-brand-cyan px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:shadow-xl"
                >
                  Configure seu agente agora
                </a>
              </div>

              {/* Coluna direita - Etapas do processo */}
              <div className="space-y-6" data-animate style={{ transitionDelay: "100ms" }}>
                {/* Etapa 1 */}
                <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-primary/30 hover:shadow-md">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary/10 to-brand-aqua/10">
                    <Users className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-semibold text-slate-900">
                      Entendimento da operação
                    </h3>
                    <p className="text-sm text-slate-600">
                      Conversamos com você para mapear o funcionamento e as necessidades do seu negócio.
                    </p>
                  </div>
                </div>

                {/* Etapa 2 */}
                <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-primary/30 hover:shadow-md">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-cyan/10 to-brand-blue/10">
                    <FileText className="h-6 w-6 text-brand-cyan" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-semibold text-slate-900">
                      Análise de conversas reais
                    </h3>
                    <p className="text-sm text-slate-600">
                      Identificamos padrões e oportunidades a partir do histórico de atendimentos.
                    </p>
                  </div>
                </div>

                {/* Etapa 3 */}
                <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-primary/30 hover:shadow-md">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-aqua/10 to-brand-primary/10">
                    <Sparkles className="h-6 w-6 text-brand-aqua" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-semibold text-slate-900">
                      Definição do tom de voz
                    </h3>
                    <p className="text-sm text-slate-600">
                      Criamos uma comunicação que reflete a personalidade da sua marca.
                    </p>
                  </div>
                </div>

                {/* Etapa 4 */}
                <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-primary/30 hover:shadow-md">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-lime/10 to-brand-primary/10">
                    <CheckCircle2 className="h-6 w-6 text-brand-lime" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-semibold text-slate-900">
                      Testes e ajustes
                    </h3>
                    <p className="text-sm text-slate-600">
                      Em até 2 semanas, o agente é testado, ajustado e pronto para conversar como você faria.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="demonstracao" className="bg-slate-50 py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="mb-16 space-y-4 text-center" data-animate>
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                Veja Como é Simples e Poderoso
              </h2>
              <p className="mx-auto max-w-2xl text-base text-slate-600">
                Conheça o sistema que vai transformar o seu delivery
              </p>
            </div>

            {/* Vídeo demonstrativo */}
            <div className="mb-16" data-animate>
              <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 shadow-2xl">
                <div className="relative aspect-video w-full">
                  <video
                    src={jyzeVideo}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                    aria-label="Demonstração do Jyze em funcionamento"
                  />
                </div>
              </div>
            </div>

            {/* Screenshots */}
            <div className="mb-12 grid gap-8 md:grid-cols-3">
              <ScreenshotCard
                title="Painel de Gestão"
                description="Dashboard completo com todas as informações em tempo real"
                imageUrl="/dashboard.webp"
                index={0}
                onClick={() => setSelectedImage({ url: "/dashboard.webp", title: "Painel de Gestão" })}
              />
              <ScreenshotCard
                title="Gestor de Pedidos"
                description="Controle total de todos os pedidos do delivery"
                imageUrl="/gestor-de-pedidos.webp"
                index={1}
                onClick={() => setSelectedImage({ url: "/gestor-de-pedidos.webp", title: "Gestor de Pedidos" })}
              />
              <ScreenshotCard
                title="Gestão de Clientes"
                description="CRM completo com histórico e preferências"
                imageUrl="/Gestão-de-clientes.webp"
                index={2}
                onClick={() => setSelectedImage({ url: "/Gestão-de-clientes.webp", title: "Gestão de Clientes" })}
              />
            </div>

            {/* CTA */}
            <div className="text-center" data-animate>
              <a
                href="#contato"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-primary via-brand-aqua to-brand-cyan px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:shadow-xl"
              >
                Agendar Demonstração Ao Vivo
              </a>
            </div>
          </div>
        </section>

        {/* Seção Inteligência Artificial */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            {/* Badge */}
            <div className="mb-8 text-center" data-animate>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-primary backdrop-blur-sm">
                💎 Tecnologia Exclusiva com IA Jyze
              </span>
            </div>

            {/* Título e Subtítulo */}
            <div className="mb-16 space-y-6 text-center" data-animate>
              <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                A IA que entende seu cliente e impulsiona seu negócio
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-slate-300 md:text-xl">
                Mais que tecnologia — uma assistente que trabalha 24h pelo seu sucesso.
              </p>
            </div>

            {/* Grid de Blocos */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Bloco 1 - Atendimento Inteligente e Autônomo */}
              <div 
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-brand-primary/40 hover:bg-white/10 hover:shadow-lg hover:shadow-brand-primary/10"
                data-animate
                style={{ transitionDelay: "0ms" }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-aqua/20">
                  <Brain className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">
                  Atendimento Inteligente e Autônomo
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  A IA da Jyze conversa com seus clientes em tempo real, realiza pedidos completos, gera pagamentos e adapta o atendimento conforme o perfil de cada usuário — tudo isso com linguagem natural e humanizada.
                </p>
              </div>

              {/* Bloco 2 - Inteligência que Aprende com o Seu Negócio */}
              <div 
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-brand-cyan/40 hover:bg-white/10 hover:shadow-lg hover:shadow-brand-cyan/10"
                data-animate
                style={{ transitionDelay: "100ms" }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-cyan/20 to-brand-blue/20">
                  <TrendingUp className="h-6 w-6 text-brand-cyan" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">
                  Inteligência que Aprende com o Seu Negócio
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  Nos bastidores, nossa IA analisa dados de desempenho, identifica gargalos e sugere melhorias. Ela aprende com cada interação para otimizar tempo, custos e satisfação dos seus clientes.
                </p>
              </div>

              {/* Bloco 3 - Integração Total com o seu Delivery */}
              <div 
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-brand-aqua/40 hover:bg-white/10 hover:shadow-lg hover:shadow-brand-aqua/10"
                data-animate
                style={{ transitionDelay: "200ms" }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-aqua/20 to-brand-primary/20">
                  <Network className="h-6 w-6 text-brand-aqua" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">
                  Integração Total com o seu Delivery
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  Da rota de entrega ao controle de produtos, a IA da Jyze trabalha integrada ao seu sistema, garantindo precisão em cada etapa. Tudo acontece de forma fluida, sem necessidade de múltiplas ferramentas.
                </p>
              </div>

              {/* Bloco 4 - Um Novo Padrão de Atendimento */}
              <div 
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-brand-lime/40 hover:bg-white/10 hover:shadow-lg hover:shadow-brand-lime/10"
                data-animate
                style={{ transitionDelay: "300ms" }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-lime/20 to-brand-primary/20">
                  <Sparkles className="h-6 w-6 text-brand-lime" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">
                  Um Novo Padrão de Atendimento
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  Mais que automação, a Jyze entrega uma experiência personalizada e empática. Quando necessário, nossa IA aciona um humano para manter a qualidade e o toque humano do seu atendimento.
                </p>
              </div>

              {/* Bloco 5 - Tecnologia Premium, para Resultados Reais */}
              <div 
                className="group rounded-2xl border border-white/10 bg-gradient-to-br from-brand-primary/10 via-brand-aqua/5 to-brand-cyan/10 p-6 backdrop-blur-sm transition hover:border-brand-primary/50 hover:shadow-lg hover:shadow-brand-primary/20 md:col-span-2 lg:col-span-2"
                data-animate
                style={{ transitionDelay: "400ms" }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary/30 to-brand-aqua/30">
                  <Award className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">
                  Tecnologia Premium, para Resultados Reais
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  Cada interação é uma oportunidade de evoluir. A IA da Jyze transforma dados em decisões inteligentes — e o seu delivery, em uma operação de alto desempenho.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Modelos de Negócio Atendidos */}
        <section className="relative overflow-hidden bg-white py-20">
          <div className="mx-auto max-w-7xl px-8">
            <div className="mb-12 space-y-4 text-center" data-animate>
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                Modelos de Delivery atendidos
              </h2>
              <p className="mx-auto max-w-2xl text-base text-slate-600">
                Solução completa para diversos tipos de estabelecimentos no setor de alimentação
              </p>
            </div>

            {/* Container do carrossel */}
            <div className="relative" data-animate>
              {/* Gradiente esquerdo */}
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent"></div>
              
              {/* Gradiente direito */}
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent"></div>

              {/* Scroll container com animação */}
              <div className="hide-scrollbar overflow-x-auto">
                <div className="business-carousel flex gap-6 pb-4">
                  {/* Duplicar os cards para efeito infinito */}
                  {[...businessTypes, ...businessTypes].map((business, idx) => {
                    const Icon = business.icon;
                    // Array de cores da paleta do site
                    const brandColors = [
                      "text-brand-primary",
                      "text-brand-cyan",
                      "text-brand-aqua",
                      "text-brand-lime",
                      "text-brand-blue",
                      "text-brand-mint",
                      "text-brand-chatBlue",
                    ];
                    // Seleciona cor baseada no índice do business type (não do idx duplicado)
                    const colorIndex = idx % businessTypes.length;
                    const iconColor = brandColors[colorIndex % brandColors.length];
                    return (
                      <div
                        key={idx}
                        className="flex min-w-[200px] flex-shrink-0 flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-8"
                      >
                        <div className="relative flex h-20 w-20 items-center justify-center">
                          <Icon className={`h-10 w-10 ${iconColor}`} />
                        </div>
                        <h3 className="text-center text-sm font-semibold text-slate-900">
                          {business.name}
                        </h3>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Instrução de scroll (mobile) */}
            <div className="mt-6 text-center lg:hidden" data-animate>
              <p className="text-xs text-slate-600">
                ← Deslize para ver mais →
              </p>
            </div>
          </div>
        </section>

        {/* CHAT JYZELI DESABILITADO */}
        {/* <section id="assistente" className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-16 space-y-4 text-center" data-animate>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Assistente Inteligente</p>
              <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                Converse com a Jyzeli e tire suas dúvidas
              </h2>
              <p className="mx-auto max-w-2xl text-slate-600">
                Fale em tempo real com nossa IA personalizada para entender como a Jyze pode transformar o seu delivery.
              </p>
            </div>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]" data-animate>
              <div className="space-y-6 self-center">
                <div className="inline-flex items-center gap-3 rounded-full bg-brand-chatBlue/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-chatBlue">
                  Disponível 24/7
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">
                  Descubra em minutos o que a Jyze pode fazer pelo seu negócio
                </h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li>• Entenda os recursos ideais para o seu volume de pedidos.</li>
                  <li>• Veja exemplos de fluxos, integrações e automações.</li>
                  <li>• Tire dúvidas sobre implantação, suporte e custos.</li>
                </ul>
                <p className="rounded-3xl border border-brand-chatBlue/20 bg-brand-chatBlue/10 px-5 py-4 text-sm text-brand-chatBlue">
                  Sugestão: compartilhe seu volume de pedidos, canais atuais e desafios para receber respostas mais assertivas.
                </p>
              </div>
              <div className="flex h-[780px] flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl">
                <div className="flex items-center justify-between rounded-t-3xl bg-slate-900 px-4 py-3 text-white">
                  <div>
                    <p className="text-base font-semibold">Jyzeli - Assistente Virtual</p>
                    <p className="text-sm text-slate-300">Respostas inteligentes em tempo real</p>
                  </div>
                </div>
                <div
                  ref={chatContainerRef}
                  className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-base font-semibold text-brand-chatBlue"
                >
                  {hasNewMessages && !isUserNearBottom && (
                    <div className="sticky top-0 z-10 flex justify-center">
                      <button
                        type="button"
                        className="mb-2 rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-white shadow hover:bg-brand-primary/90"
                        onClick={() => {
                          const container = chatContainerRef.current;
                          if (container) {
                            const targetScrollTop = container.scrollHeight - container.clientHeight;
                            container.scrollTo({ top: targetScrollTop, behavior: "smooth" });
                          }
                        }}
                      >
                        Novas mensagens ↓
                      </button>
                    </div>
                  )}
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl shadow-sm ${
                          message.role === "user"
                            ? "bg-brand-primary text-white"
                            : "bg-slate-100 text-slate-900"
                        } ${message.type === 'image' ? 'p-2' : 'px-4 py-2.5'}`}
                      >
                        {message.type === 'image' && message.imageUrl && (
                          <div className="mb-1">
                            <img 
                              src={message.imageUrl}
                              alt="Imagem enviada"
                              className="block max-w-full h-auto rounded-lg"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                console.error('❌ Erro ao carregar imagem:', message.imageUrl);
                                e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Imagem+indisponível';
                              }}
                              onLoad={() => {
                                console.log('✅ Imagem carregada:', message.imageUrl);
                              }}
                            />
                          </div>
                        )}
                        {message.content && message.content.trim() !== '' && (
                          <div className={message.type === 'image' ? 'px-2 pb-1' : ''}>{message.content}</div>
                        )}
                        {message.type === 'image' && !message.imageUrl && message.content && (
                          <div className="text-xs text-red-500">
                            Não foi possível exibir a imagem.
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isChatTyping && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm">
                        IA digitando…
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
                <div className="border-t border-slate-200 p-4">
                  {quickQuestionsVisible && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {quickQuestions.map((question) => (
                        <button
                          key={question}
                          type="button"
                          className="rounded-full border border-brand-chatBlue/40 bg-white px-3 py-1.5 text-sm font-semibold text-brand-chatBlue transition hover:border-brand-chatBlue/60 hover:bg-brand-chatBlue/10"
                          onClick={() => void handleQuickQuestion(question)}
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  )}
                  <textarea
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    onKeyDown={handleChatKeyDown}
                    onFocus={() => setQuickQuestionsVisible(false)}
                    placeholder="Escreva sua mensagem e pressione Enter"
                    className="h-28 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-base font-semibold text-brand-chatBlue shadow-sm outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/60/40"
                  />
                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-primary/90 focus:outline-none focus:ring-4 focus:ring-brand-primary/60"
                      onClick={() => void sendChatMessage()}
                      disabled={isChatTyping}
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* <section id="planos" className="bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-16 space-y-4 text-center" data-animate>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Planos e preços</p>
              <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                Escolha o plano ideal para seu negócio
              </h2>
              <p className="mx-auto max-w-2xl text-slate-600">
                Sem taxas ocultas. Sem fidelidade. Cancele quando quiser.
              </p>
            </div>
            <div className="mb-12 flex justify-center" data-animate style={{ transitionDelay: "80ms" }}>
              <div className="inline-flex rounded-full border border-slate-200 bg-white/80 p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => setBillingCycle("annual")}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                    billingCycle === "annual"
                      ? "bg-slate-900 text-white shadow"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Assinatura anual
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle("monthly")}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                    billingCycle === "monthly"
                      ? "bg-slate-900 text-white shadow"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Plano mensal
                </button>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
              {plans.map((plan, idx) => {
                const pricing = billingCycle === "annual" ? plan.annual : plan.monthly;
                const isEnterprise = plan.name === "Plano Enterprise";
                // Obter link de checkout baseado no plano e ciclo de faturamento
                const checkoutLink = isEnterprise
                  ? `https://wa.me/554598290794?text=${encodeURIComponent("Olá, tenho interesse no Plano Enterprise!!")}`
                  : checkoutLinks[plan.name] 
                    ? checkoutLinks[plan.name][billingCycle]
                    : "#contato";

                return (
                <div
                  key={idx}
                    className={`relative flex h-full flex-col rounded-3xl border p-6 transition ${
                    plan.highlighted
                      ? "border-brand-primary bg-white shadow-xl ring-2 ring-brand-primary/20"
                      : "border-slate-200 bg-white hover:border-brand-primary/40 hover:shadow-lg"
                  }`}
                  data-animate
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                    {plan.tag && (
                      <span className="absolute -top-3 left-1/2 w-max -translate-x-1/2 rounded-full border border-brand-primary bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-brand-primary">
                        {plan.tag}
                      </span>
                    )}
                    <div className="flex flex-col items-center gap-4 text-center">
                      <h3 className="text-2xl font-semibold text-slate-900">{plan.name}</h3>
                      <span className="rounded-full bg-slate-900/5 px-4 py-1 text-sm font-semibold text-slate-700">
                        {plan.setup}
                      </span>
                      <div className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                          {pricing.subheadline}
                        </p>
                        <p
                          className={`mt-3 font-semibold text-slate-900 ${
                            isEnterprise
                              ? `${
                                  billingCycle === "annual"
                                    ? "-ml-[13px]"
                                    : "ml-[1px]"
                                } text-2xl`
                               : "-ml-[15px] text-3xl whitespace-nowrap"
                           }`}
                        >
                          {pricing.headline}
                        </p>
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                        {plan.idealFor}
                      </p>
                    </div>
                  {plan.stats?.length ? (
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-slate-700">Limites do plano</h4>
                      <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
                        {plan.stats.map((item, statIdx) => (
                          <li key={statIdx} className="flex items-start gap-3">
                            <span className="mt-0.5 text-brand-primary">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-slate-700">Principais recursos</h4>
                    <ul className="mt-2 space-y-1.5 text-sm">
                      {allPlanFeatures.map((feature) => {
                        const isIncluded = plan.includedFeatures.includes(feature);
                        return (
                          <li key={feature} className="flex items-start gap-3">
                            <span
                              className={`mt-0.5 text-sm font-semibold ${
                                isIncluded ? "text-emerald-500" : "text-rose-500"
                              }`}
                            >
                              {isIncluded ? "✓" : "X"}
                            </span>
                            <span className={isIncluded ? "text-slate-600" : "text-slate-400"}>{feature}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="mt-4 flex-1" />
                  <div className="mt-4">
                  <a
                    href={checkoutLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block rounded-full px-6 py-3 text-center text-sm font-semibold transition ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-brand-primary via-brand-aqua to-brand-cyan text-white shadow-lg hover:shadow-xl"
                        : "border border-slate-200 text-slate-900 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
                </div>
              );
            })}
            </div>
            <div className="mt-12 grid gap-6 rounded-3xl border border-brand-primary/20 bg-brand-primary/10/40 p-10 text-left" data-animate>
              <h3 className="text-lg font-semibold text-slate-900">Bônus para todos os planos</h3>
              <ul className="grid gap-4 sm:grid-cols-2">
                {planBonus.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="mt-0.5 text-brand-primary">★</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-slate-600">
                Combine os recursos do seu plano com os bônus acima e tenha uma operação completa, do atendimento à gestão de resultados.
              </p>
            </div>
          </div>
        </section> */}

        <section id="contato" className="bg-slate-950 py-24 text-white">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16" data-animate>
              {/* Coluna Esquerda - Texto */}
              <div className="flex flex-col justify-center space-y-6">
                <span className="inline-flex w-fit items-center gap-3 rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300">
                Comece hoje
              </span>
              <h2 className="text-3xl font-semibold md:text-5xl">
                Pronto para transformar seu delivery?
              </h2>
                <p className="text-lg text-slate-300">
                  Preencha o formulário ao lado e nossa equipe entrará em contato em até 10 minutos para agendar uma demonstração personalizada.  
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-brand-primary/80">✓</span>
                    <div>
                      <p className="font-semibold text-white">Demonstração gratuita</p>
                      <p className="text-sm text-slate-400">Veja a Jyze em ação no seu negócio</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-brand-primary/80">✓</span>
                    <div>
                      <p className="font-semibold text-white">Sem compromisso</p>
                      <p className="text-sm text-slate-400">Conheça primeiro, decida depois</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-brand-primary/80">✓</span>
                    <div>
                      <p className="font-semibold text-white">Suporte dedicado</p>
                      <p className="text-sm text-slate-400">Time especializado para sua implantação</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coluna Direita - Formulário */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-white">
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleFormChange}
                      required
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/40"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-white">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/40"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-white">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                      maxLength={15}
                      inputMode="tel"
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/40"
                      placeholder="(00) 00000-0000"
                    />
                  </div>

                  <div>
                    <label htmlFor="companyName" className="mb-2 block text-sm font-semibold text-white">
                      Nome da empresa *
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleFormChange}
                      required
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/40"
                      placeholder="Nome do seu restaurante ou delivery"
                    />
                  </div>

                  <div>
                    <label htmlFor="monthlyOrders" className="mb-2 block text-sm font-semibold text-white">
                      Média de pedidos mensais *
                    </label>
                    <input
                      type="text"
                      id="monthlyOrders"
                      name="monthlyOrders"
                      value={formData.monthlyOrders}
                      onChange={handleFormChange}
                      required
                      inputMode="numeric"
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/40"
                      placeholder="Ex: 200"
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="mb-2 block text-sm font-semibold text-white">
                      Estado *
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleFormChange}
                      required
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/40"
                    >
                      <option value="" className="bg-slate-900 text-white">
                        Selecione seu estado
                      </option>
                      {brazilianStates.map((state) => (
                        <option key={state} value={state} className="bg-slate-900 text-white">
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-gradient-to-r from-brand-primary via-brand-aqua to-brand-cyan px-6 py-4 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? "Enviando..." : "Agendar demonstração gratuita"}
                  </button>

                  <p className="text-center text-xs text-slate-400">
                    Ao enviar, você concorda em receber contato da nossa equipe.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Seção FAQ */}
        <section id="faq" className="bg-slate-50 py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="mb-16 space-y-4 text-center" data-animate>
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                Perguntas Frequentes
              </h2>
              <p className="mx-auto max-w-2xl text-base text-slate-600">
                Encontre respostas rápidas sobre como a Jyze pode transformar o atendimento do seu delivery.
              </p>
            </div>

            <div className="mx-auto max-w-4xl space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all hover:border-brand-primary/40 hover:shadow-xl"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-slate-50/50"
                  >
                    <h3 className="pr-8 text-lg font-semibold text-slate-900 md:text-xl">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedFAQ === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 rounded-full bg-gradient-to-br from-brand-primary/10 to-brand-aqua/10 p-2"
                    >
                      <ChevronDown className="h-5 w-5 text-brand-primary" strokeWidth={2.5} />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedFAQ === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-slate-200 px-6 pb-6 pt-4">
                          <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <a href="#inicio" className="flex items-center">
              <img 
                src="/images/Logo.png" 
                alt="Jyze Delivery" 
                className="h-14 w-auto object-contain"
              />
            </a>
            <p className="text-center text-sm text-slate-600 md:text-right">
              © 2025 Jyze Delivery. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal de visualização de imagem */}
      <ImageModal
        isOpen={selectedImage !== null}
        imageUrl={selectedImage?.url || ""}
        title={selectedImage?.title || ""}
        onClose={() => setSelectedImage(null)}
      />

      {/* Botão flutuante do WhatsApp */}
      <WhatsAppButton 
        phoneNumber="554598290794"
        message="Olá, quero saber mais sobre o Jyze Delivery!"
      />

      {/* Notificação Toast */}
      {notification.show && (
        <div
          className={`toast-notification fixed top-4 right-4 left-4 z-50 flex max-w-md items-center gap-3 rounded-xl border px-4 py-3 shadow-2xl backdrop-blur-md md:left-auto md:min-w-[320px] md:px-5 md:py-4 ${
            notification.type === 'success'
              ? 'border-green-500/50 bg-gradient-to-br from-green-500/30 via-emerald-500/20 to-teal-500/10 text-white ring-2 ring-green-500/20'
              : notification.type === 'error'
              ? 'border-red-500/50 bg-gradient-to-br from-red-500/30 via-rose-500/20 to-pink-500/10 text-white ring-2 ring-red-500/20'
              : 'border-yellow-500/50 bg-gradient-to-br from-yellow-500/30 via-amber-500/20 to-orange-500/10 text-white ring-2 ring-yellow-500/20'
          }`}
        >
          <div className="flex items-center gap-3 flex-1">
            {notification.type === 'success' && (
              <div className="flex-shrink-0 rounded-full bg-green-500/20 p-1.5">
                <CheckCircle2 className="h-5 w-5 text-green-300" />
              </div>
            )}
            {notification.type === 'error' && (
              <div className="flex-shrink-0 rounded-full bg-red-500/20 p-1.5">
                <XCircle className="h-5 w-5 text-red-300" />
              </div>
            )}
            {notification.type === 'warning' && (
              <div className="flex-shrink-0 rounded-full bg-yellow-500/20 p-1.5">
                <AlertCircle className="h-5 w-5 text-yellow-300" />
              </div>
            )}
            <p className="font-medium text-sm leading-relaxed">{notification.message}</p>
          </div>
          <button
            onClick={() => setNotification(prev => ({ ...prev, show: false }))}
            className="ml-2 flex-shrink-0 rounded-lg p-1.5 transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Fechar notificação"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

    </div>
  );
};

export default Index;
