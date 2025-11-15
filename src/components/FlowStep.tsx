import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FlowStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  details?: string[];
  fullDescription?: string;
  index: number;
  isLast?: boolean;
  isExpanded: boolean;
  isSelected: boolean;
  onToggle: () => void;
}

const FlowStep = ({ 
  icon: Icon, 
  title, 
  description, 
  details,
  fullDescription,
  index, 
  isLast = false,
  isExpanded,
  isSelected,
  onToggle
}: FlowStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col items-center ${
        isExpanded ? "lg:col-span-1" : ""
      }`}
    >
      {/* Card da etapa - comportamento diferente mobile/desktop */}
      <motion.div
        layout
        onClick={onToggle}
        whileHover={{ scale: isExpanded ? 1 : 1.05 }}
        className={`group relative z-10 flex w-full cursor-pointer flex-col rounded-2xl border bg-white shadow-lg transition-all
          ${isSelected ? "border-brand-primary ring-2 ring-brand-primary/40" : "border-slate-200 hover:border-brand-primary/60"}
          ${isExpanded ? "border-brand-primary p-8 shadow-2xl lg:items-center lg:border-slate-200 lg:p-6 lg:shadow-lg lg:ring-0" : "items-center p-6 hover:shadow-xl"}
        `}
      >
        {/* Header - layout adaptativo */}
        <div className={`flex ${isExpanded ? "items-start justify-between lg:flex-col lg:items-center" : "flex-col items-center"}`}>
          <div className={`flex ${isExpanded ? "items-start gap-4 lg:flex-col lg:items-center" : "flex-col items-center"}`}>
            {/* Ícone */}
            <div className={`rounded-full bg-gradient-to-br from-brand-primary/10 to-brand-aqua/10 transition-all ${
              isExpanded 
                ? "p-4 lg:mb-4 lg:p-4 group-hover:from-brand-primary/20 group-hover:to-brand-aqua/20" 
                : "mb-4 p-4 group-hover:from-brand-primary/20 group-hover:to-brand-aqua/20"
            }`}>
              <Icon className={`text-brand-primary transition-colors group-hover:text-brand-aqua ${
                isExpanded ? "h-10 w-10 lg:h-8 lg:w-8" : "h-8 w-8"
              }`} strokeWidth={2} />
            </div>
            
            <div className={isExpanded ? "flex-1 lg:flex-none" : ""}>
              {/* Título */}
              <h3 className={`font-bold text-slate-900 ${
                isExpanded ? "mb-1 text-left text-2xl lg:mb-2 lg:text-center lg:text-base" : "mb-2 text-center text-base"
              }`}>
                {title}
              </h3>
              
              {/* Descrição - sempre visível no desktop, oculta quando expandido no mobile */}
              <p className={`text-sm text-slate-600 ${
                isExpanded ? "hidden lg:block lg:text-center" : "text-center"
              }`}>
                {description}
              </p>
            </div>
          </div>

          {/* Botão fechar - apenas mobile quando expandido */}
          {isExpanded && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-200 lg:hidden"
            >
              <span>Fechar</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>

        {/* Conteúdo expandido - apenas mobile */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="mt-6 space-y-4">
              {/* Descrição completa */}
              {fullDescription && (
                <p className="text-slate-600">
                  {fullDescription}
                </p>
              )}

              {/* Detalhes em lista */}
              {details && details.length > 0 && (
                <div>
                  <h4 className="mb-3 font-semibold text-slate-900">Principais recursos:</h4>
                  <ul className="space-y-2">
                    {details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                        <span className="mt-0.5 text-brand-primary">✓</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Indicador de clique - sempre visível no desktop, oculto quando expandido no mobile */}
        <div className={`mt-3 flex items-center gap-1 text-xs text-brand-primary transition-opacity duration-300 ${
          isExpanded ? "opacity-0 group-hover:opacity-0 lg:opacity-0 lg:group-hover:opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}>
          <span>Clique para ver mais</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 3V9M9 6L6 9L3 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </motion.div>

      {/* Linha conectora (desktop - horizontal) - oculta quando expandido no mobile */}
      {!isLast && (
        <div className={`absolute left-1/2 top-20 hidden h-0.5 w-full bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300 ${
          isExpanded ? "lg:block" : "lg:block"
        }`} />
      )}

      {/* Linha conectora (mobile - vertical) - oculta quando expandido */}
      {!isLast && !isExpanded && (
        <div className="absolute left-1/2 top-full h-12 w-0.5 -translate-x-1/2 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-300 lg:hidden" />
      )}
    </motion.div>
  );
};

export default FlowStep;
