import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  title: string;
  onClose: () => void;
}

const ImageModal = ({ isOpen, imageUrl, title, onClose }: ImageModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[90vh] max-w-[90vw] overflow-auto rounded-2xl bg-white p-2 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100"
              >
                <span>Fechar</span>
                <X className="h-4 w-4" />
              </button>

              {/* Image */}
              <img
                src={imageUrl}
                alt={title}
                className="h-auto w-full rounded-lg"
              />

              {/* Title */}
              <div className="mt-4 px-4 pb-2 text-center">
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;









