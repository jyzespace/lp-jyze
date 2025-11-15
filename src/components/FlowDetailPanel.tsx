import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, X } from "lucide-react";

interface FlowDetailPanelProps {
  icon: LucideIcon;
  title: string;
  fullDescription: string;
  details: string[];
  onClose: () => void;
}

const FlowDetailPanel = ({ 
  icon: Icon, 
  title, 
  fullDescription, 
  details,
  onClose 
}: FlowDetailPanelProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: 20, height: 0 }}
        transition={{ duration: 0.4 }}
        className="col-span-full mt-8 overflow-hidden"
      >
        <div className="rounded-2xl border border-brand-primary bg-white p-8 shadow-2xl">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              {/* Ícone */}
              <div className="rounded-full bg-gradient-to-br from-brand-primary/10 to-brand-aqua/10 p-4">
                <Icon className="h-10 w-10 text-brand-primary" strokeWidth={2} />
              </div>
              
              <div className="flex-1">
                {/* Título */}
                <h3 className="mb-1 text-2xl font-bold text-slate-900">
                  {title}
                </h3>
              </div>
            </div>

            {/* Botão fechar */}
            <button
              onClick={onClose}
              className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-200"
            >
              <span>Fechar</span>
              <X className="h-3 w-3" />
            </button>
          </div>

          {/* Conteúdo */}
          <div className="mt-6 space-y-4">
            {/* Descrição completa */}
            <p className="text-slate-600">
              {fullDescription}
            </p>

            {/* Detalhes em lista */}
            {details && details.length > 0 && (
              <div>
                <h4 className="mb-3 font-semibold text-slate-900">Principais recursos:</h4>
                <ul className="grid gap-3 sm:grid-cols-2">
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
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FlowDetailPanel;










