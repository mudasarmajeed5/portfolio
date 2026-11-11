"use client";

import { ArrowLeft, ArrowRight, MoreVertical } from "lucide-react";
import styles from "./MobileAppBar.module.css";

type Props = {
  title: string;
  canBack: boolean;
  canForward: boolean;
  onBack: () => void;
  onForward: () => void;
  onMenu: () => void;
};

export default function MobileAppBar({
  title,
  canBack,
  canForward,
  onBack,
  onForward,
  onMenu,
}: Props) {
  return (
    <header className={styles.bar} aria-label="Mobile app controls">
      {canBack ? (
        <button onClick={onBack} aria-label="Go back">
          <ArrowLeft size={23} />
        </button>
      ) : (
        <span className={styles.avatar} aria-hidden="true">
          m.
        </span>
      )}
      <span className={styles.title}>{title}</span>
      <button
        onClick={onForward}
        disabled={!canForward}
        aria-label="Go forward"
      >
        <ArrowRight size={21} />
      </button>
      <button
        onClick={onMenu}
        aria-label="Open portfolio menu"
        aria-controls="portfolio-app-menu"
      >
        <MoreVertical size={22} />
      </button>
    </header>
  );
}
