import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  images: string[];
  intervalMs?: number;
}

export default function Slideshow({ images, intervalMs = 4000 }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      intervalMs
    );
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-amber-300/20 bg-black/40 shadow-2xl sm:aspect-[16/9]">
      <AnimatePresence mode="sync">
        <motion.img
          key={index}
          src={images[index]}
          alt={`Recuerdo ${index + 1}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f0d0a]/60 via-transparent to-transparent" />

      {/* Indicadores */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Ir a foto ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index ? "w-8 bg-amber-300" : "w-2 bg-amber-200/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
