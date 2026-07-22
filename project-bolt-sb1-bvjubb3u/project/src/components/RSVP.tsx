import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { eventData } from "../data";
import Reveal from "./Reveal";

export default function RSVP() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(1);
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);

  const buildWhatsAppLink = () => {
    const status = attending === "yes" ? "Sí asistiré" : "No podré asistir";
    const msg = `¡Hola! Soy ${name || "[tu nombre]"}. ${status} a los XV años de Joselin Mairel. ${
      attending === "yes" ? `Seremos ${guests} persona(s).` : ""
    }`;
    const number = eventData.whatsappNumber;
    if (!number) {
      alert("Agrega el número de WhatsApp en src/data.ts");
      return;
    }
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attending) {
      alert("Por favor confirma tu asistencia antes del 15/09/2026");
      return;
    }
    buildWhatsAppLink();
  };

  return (
    <Reveal className="mx-auto max-w-md">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-amber-300/20 bg-amber-300/5 p-8 backdrop-blur-sm"
      >
        <div className="mb-6">
          <label className="mb-2 block font-sans-lux text-[10px] uppercase tracking-[0.3em] text-amber-200/60">
            Nombre
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            className="w-full rounded-xl border border-amber-300/20 bg-[#1a1611]/60 px-4 py-3 font-serif text-lg text-amber-50 placeholder:text-amber-200/30 focus:border-amber-300/50 focus:outline-none"
          />
        </div>

        <div className="mb-8">
          <label className="mb-2 block font-sans-lux text-[10px] uppercase tracking-[0.3em] text-amber-200/60">
            Número de invitados
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              className="h-10 w-10 rounded-full border border-amber-300/30 text-amber-200 transition hover:bg-amber-300/10"
            >
              −
            </button>
            <span className="font-serif text-2xl text-gold-gradient tabular-nums">
              {guests}
            </span>
            <button
              type="button"
              onClick={() => setGuests((g) => Math.min(5, g + 1))}
              className="h-10 w-10 rounded-full border border-amber-300/30 text-amber-200 transition hover:bg-amber-300/10"
            >
              +
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <motion.button
            type="button"
            onClick={() => setAttending("yes")}
            whileTap={{ scale: 0.96 }}
            className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-4 font-sans-lux text-xs uppercase tracking-[0.2em] transition ${
              attending === "yes"
                ? "border-amber-300 bg-gold-gradient text-[#1a1611]"
                : "border-amber-300/30 text-amber-200 hover:bg-amber-300/10"
            }`}
          >
            <Check className="h-4 w-4" />
            Sí asistiré
          </motion.button>
          <motion.button
            type="button"
            onClick={() => setAttending("no")}
            whileTap={{ scale: 0.96 }}
            className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-4 font-sans-lux text-xs uppercase tracking-[0.2em] transition ${
              attending === "no"
                ? "border-rose-400/60 bg-rose-400/20 text-rose-200"
                : "border-amber-300/30 text-amber-200 hover:bg-amber-300/10"
            }`}
          >
            <X className="h-4 w-4" />
            No podré asistir
          </motion.button>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 w-full rounded-xl bg-gold-gradient py-4 font-sans-lux text-xs uppercase tracking-[0.3em] text-[#1a1611] shadow-lg"
        >
          Confirmar por WhatsApp
        </motion.button>
      </form>
    </Reveal>
  );
}
