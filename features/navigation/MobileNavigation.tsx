"use client";

import {
  FolderOpen,
  MoreHorizontal,
  UserRound,
  BriefcaseBusiness,
} from "lucide-react";
import styles from "./MobileNavigation.module.css";

const destinations = [
  { id: "about", label: "About", icon: UserRound },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
] as const;

type Destination = (typeof destinations)[number]["id"];
export default function MobileNavigation({
  current,
  expanded,
  onNavigate,
  onMore,
}: {
  current?: string;
  expanded: boolean;
  onNavigate: (id: Destination) => void;
  onMore: () => void;
}) {
  const secondary = Boolean(
    current && !destinations.some((item) => item.id === current),
  );
  return (
    <nav className={styles.navigation} aria-label="Mobile portfolio navigation">
      {destinations.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onNavigate(id)}
          aria-current={!expanded && current === id ? "page" : undefined}
        >
          <span className={styles.icon}>
            <Icon size={22} strokeWidth={1.7} />
          </span>
          <span>{label}</span>
        </button>
      ))}
      <button
        onClick={onMore}
        aria-expanded={expanded}
        aria-controls="portfolio-app-menu"
        aria-label="More sections and applications"
        data-active={!expanded && secondary ? "true" : undefined}
      >
        <span className={styles.icon}>
          <MoreHorizontal size={23} />
        </span>
        <span>More</span>
      </button>
    </nav>
  );
}
