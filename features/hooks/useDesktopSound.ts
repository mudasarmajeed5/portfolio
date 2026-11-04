"use client";
import { useCallback, useEffect, useRef, useState } from "react";
type Sound = "tap" | "lock" | "unlock";
export function useDesktopSound() {
  const audio = useRef<AudioContext | null>(null);
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        setEnabled(localStorage.getItem("portfolio-sound") !== "off");
      } catch {}
    });
    return () => {
      cancelAnimationFrame(frame);
      void audio.current?.close();
      audio.current = null;
    };
  }, []);
  const play = useCallback(
    (sound: Sound) => {
      if (!enabled) return;
      try {
        const context = (audio.current ||= new AudioContext());
        if (context.state === "suspended") void context.resume();
        const now = context.currentTime;
        const notes =
          sound === "tap"
            ? [600]
            : sound === "unlock"
              ? [440, 660, 880]
              : [660, 440, 330];
        notes.forEach((frequency, i) => {
          const oscillator = context.createOscillator();
          const gain = context.createGain();
          const start = now + i * 0.035;
          const duration = sound === "tap" ? 0.035 : 0.13;
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(frequency, start);
          gain.gain.setValueAtTime(0, start);
          gain.gain.linearRampToValueAtTime(
            sound === "tap" ? 0.025 : 0.035,
            start + 0.006,
          );
          gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
          oscillator.connect(gain);
          gain.connect(context.destination);
          oscillator.start(start);
          oscillator.stop(start + duration + 0.01);
          oscillator.onended = () => {
            oscillator.disconnect();
            gain.disconnect();
          };
        });
      } catch {
        /* Audio is optional when unavailable. */
      }
    },
    [enabled],
  );
  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    try {
      localStorage.setItem("portfolio-sound", next ? "on" : "off");
    } catch {}
  };
  return { enabled, play, toggle };
}
