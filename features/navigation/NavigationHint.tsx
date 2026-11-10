"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeftRight, X } from "lucide-react";
import styles from "./NavigationHint.module.css";

type Hint = "navigation" | "project" | "window";
const messages: Record<Hint, { desktop: string; mobile: string }> = {
  navigation: {
    desktop: "Use ← and → to go back and forward through your visits.",
    mobile:
      "Use the arrows above to revisit pages. More opens all sections and apps.",
  },
  project: {
    desktop: "Press ← to return to projects. Press → to revisit this project.",
    mobile: "Tap the back arrow above to return to your previous view.",
  },
  window: {
    desktop:
      "Double-click a window title to expand it. Your work stays open when minimized.",
    mobile:
      "Your sections stay open. Use the dock to return to a minimized window.",
  },
};

export default function NavigationHint({
  active,
  context,
}: {
  active: boolean;
  context: Hint;
}) {
  const seen = useRef(new Set<Hint>());
  const [hint, setHint] = useState<Hint | null>(null);
  useEffect(() => {
    if (!active || seen.current.has(context)) return;
    const frame = requestAnimationFrame(() => {
      seen.current.add(context);
      setHint(context);
    });
    return () => cancelAnimationFrame(frame);
  }, [active, context]);
  useEffect(() => {
    if (!hint || !active) return;
    const timer = setTimeout(() => setHint(null), 8000);
    return () => clearTimeout(timer);
  }, [hint, active]);
  if (!active || !hint || hint !== context) return null;
  return (
    <aside className={styles.toast} aria-label="Navigation tip">
      <ArrowLeftRight size={18} aria-hidden="true" />
      <div role="status">
        <strong>A quick tip</strong>
        <p className={styles.desktop}>{messages[hint].desktop}</p>
        <p className={styles.mobile}>{messages[hint].mobile}</p>
      </div>
      <button aria-label="Dismiss navigation tip" onClick={() => setHint(null)}>
        <X size={16} />
      </button>
    </aside>
  );
}
