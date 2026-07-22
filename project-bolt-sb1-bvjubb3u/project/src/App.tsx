import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import StartScreen from "./components/StartScreen";
import Invitation from "./components/Invitation";
import MusicPlayer from "./components/MusicPlayer";

const AUDIO_URL = "/chiquitita.mp3";

export default function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0f0d0a]">
      <AnimatePresence mode="wait">
        {!opened ? (
          <StartScreen key="start" onOpen={() => setOpened(true)} />
        ) : (
          <Invitation key="invitation" />
        )}
      </AnimatePresence>
      <MusicPlayer audioUrl={AUDIO_URL} autoPlay={opened} />
    </div>
  );
}
