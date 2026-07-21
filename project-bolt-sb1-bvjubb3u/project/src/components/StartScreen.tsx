import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GoldenParticles from "./GoldenParticles";

interface Props {
  onOpen: () => void;
}

export default function StartScreen({ onOpen }: Props) {
  const [opening, setOpening] = useState(false);
  const [stage, setStage] = useState<"intro" | "envelope">("intro");

  const handleOpenEnvelope = () => {
    setOpening(true);
    setTimeout(() => {
      setStage("envelope");
    }, 400);
    setTimeout(() => {
      onOpen();
    }, 2200);
  };

  const handleStart = () => {
    setOpening(true);
    setTimeout(() => setStage("envelope"), 600);
    setTimeout(() => onOpen(), 2400);
  };

  return (
    <motion.div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0f0d0a] px-6 text-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <GoldenParticles density={70} />

      <AnimatePresence mode="wait">
        {stage === "intro" && !opening && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="font-sans-lux text-xs uppercase tracking-[0.5em] text-amber-200/70"
            >
              Invitación
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              className="mt-6 font-serif text-4xl font-light text-gold-gradient sm:text-5xl"
            >
              Mis XV Años
            </motion.h1>

            <div className="mx-auto my-8 h-px w-16 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

            <motion.button
              onClick={handleStart}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden rounded-full border border-amber-300/40 bg-amber-300/5 px-10 py-4 font-sans-lux text-sm uppercase tracking-[0.3em] text-amber-100 backdrop-blur-sm transition"
            >
              <span className="relative z-10">Abrir Invitación</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-amber-300/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-10 font-sans-lux text-[10px] uppercase tracking-[0.4em] text-amber-200/40"
            >
              Toca para comenzar
            </motion.p>
          </motion.div>
        )}

        {stage === "envelope" && (
          <Envelope3D opening={opening} onOpen={handleOpenEnvelope} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Envelope3D({ opening, onOpen }: { opening: boolean; onOpen: () => void }) {
  return (
    <motion.div
      key="envelope"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-10"
      style={{ perspective: 1200 }}
    >
      <div className="relative h-64 w-80 sm:w-96" style={{ transformStyle: "preserve-3d" }}>
        {/* Cuerpo del sobre */}
        <div className="absolute bottom-0 left-0 right-0 top-12 rounded-lg bg-gradient-to-b from-[#1a1611] to-[#0f0d0a] shadow-2xl ring-1 ring-amber-300/20" />

        {/* Carta */}
        <motion.div
          initial={{ y: 0 }}
          animate={opening ? { y: -180, opacity: 0.3 } : { y: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute left-4 right-4 top-6 z-10 rounded-md bg-gradient-to-b from-[#f5efe0] to-[#e8dcc8] p-6 text-center shadow-xl ring-1 ring-amber-400/30"
        >
          <p className="font-serif text-xl text-[#8b6f3a]">Mis XV Años</p>
          <div className="mx-auto my-3 h-px w-10 bg-amber-500/40" />
          <p className="font-sans-lux text-[10px] uppercase tracking-[0.3em] text-[#8b6f3a]/70">
            Joselin Mairel
          </p>
        </motion.div>

        {/* Solapa */}
        <motion.div
          initial={{ rotateX: 0 }}
          animate={opening ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute left-0 right-0 top-0 z-20 origin-top"
          style={{
            transformStyle: "preserve-3d",
            height: 0,
            width: 0,
            borderLeft: "160px solid transparent",
            borderRight: "160px solid transparent",
            borderTop: "110px solid #1a1611",
            borderBottom: "none",
            filter: "drop-shadow(0 -2px 4px rgba(201,169,97,0.2))",
          }}
        >
          <div
            style={{
              transform: "rotateX(180deg)",
              backfaceVisibility: "hidden",
            }}
          />
        </motion.div>

        {/* Sello dorado */}
        {!opening && (
          <motion.button
            onClick={onOpen}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-1/2 top-20 z-30 -translate-x-1/2"
            aria-label="Abrir sobre"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient text-[#1a1611] shadow-lg ring-2 ring-amber-200/40">
              <span className="font-serif text-2xl font-semibold">J</span>
            </div>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
