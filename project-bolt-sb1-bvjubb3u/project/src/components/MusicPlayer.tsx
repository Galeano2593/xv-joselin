import { useEffect, useRef, useState } from "react";
import { Music, Music2 } from "lucide-react";

interface Props {
  audioUrl: string;
  autoPlay: boolean;
}

// Reproductor preparado para MP3. El archivo se agregará después.
export default function MusicPlayer({ audioUrl, autoPlay }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;
    if (autoPlay) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }, [autoPlay]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pausar música" : "Reproducir música"}
      className="fixed bottom-6 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-[#1a1611] shadow-2xl ring-1 ring-amber-200/50 transition hover:scale-110"
    >
      <audio ref={audioRef} src={audioUrl || undefined} loop />
      {playing ? (
        <Music2 className="h-6 w-6 animate-pulse" />
      ) : (
        <Music className="h-6 w-6" />
      )}
      <span className="absolute -inset-1 rounded-full ring-1 ring-amber-300/30 animate-ping opacity-40" />
    </button>
  );
}
