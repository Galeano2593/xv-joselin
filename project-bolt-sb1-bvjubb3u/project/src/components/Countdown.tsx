import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Props {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calc(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({ targetDate }: Props) {
  const target = new Date(targetDate).getTime();
  const [time, setTime] = useState<TimeLeft>(() => calc(target));
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTime(calc(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const units: { label: string; value: number }[] = [
    { label: "Días", value: time.days },
    { label: "Horas", value: time.hours },
    { label: "Minutos", value: time.minutes },
    { label: "Segundos", value: time.seconds },
  ];

  return (
    <div ref={ref} className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
      {units.map((u, i) => (
        <motion.div
          key={u.label}
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.15, duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center rounded-2xl border border-amber-300/20 bg-amber-300/5 px-3 py-6 backdrop-blur-sm sm:px-6"
        >
          <span className="font-serif text-4xl font-light text-gold-gradient tabular-nums sm:text-5xl">
            {String(u.value).padStart(2, "0")}
          </span>
          <span className="mt-2 font-sans-lux text-[10px] uppercase tracking-[0.25em] text-amber-200/60">
            {u.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
