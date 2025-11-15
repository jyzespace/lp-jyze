import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";

interface ScreenshotCardProps {
  title: string;
  description: string;
  imageUrl: string;
  index: number;
  onClick: () => void;
}

const ScreenshotCard = ({ 
  title, 
  description, 
  imageUrl,
  index,
  onClick
}: ScreenshotCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group flex flex-col"
    >
      {/* Container da imagem */}
      <div 
        onClick={onClick}
        className="relative mb-4 cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-lg transition-all group-hover:border-brand-primary/60 group-hover:shadow-xl"
      >
        {/* Aspect ratio 16:9 para formato mais horizontal */}
        <div className="relative aspect-[16/9] w-full">
          <img 
            src={imageUrl} 
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          
          {/* Overlay de hover com ícone */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex flex-col items-center gap-2 text-white">
              <ZoomIn className="h-12 w-12" strokeWidth={1.5} />
              <span className="text-sm font-semibold">Clique para ampliar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Texto */}
      <div className="text-center">
        <h3 className="mb-2 text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </motion.div>
  );
};

export default ScreenshotCard;

