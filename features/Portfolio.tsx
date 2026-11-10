"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import {
  ProjectDocument,
  ExperienceContent,
  SkillsContent,
  ContactContent,
} from "./ResumeContent";
import { useDesktopSound } from "./hooks/useDesktopSound";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BatteryFull,
  Building2 as BriefcaseBusiness,
  ChevronDown,
  ChevronRight,
  Code2,
  FolderOpen as Folder,
  Gamepad2,
  LayoutGrid as Grid3X3,
  Home,
  LockKeyhole,
  Mail,
  Maximize2,
  Minus,
  Search,
  SlidersHorizontal as Settings,
  CircleUserRound as UserRound,
  Volume2,
  VolumeX,
  ScanEye,
  Wifi,
  X,
} from "lucide-react";
import Snake from "./Snake";
import {
  usePortfolioNavigation,
  type FileSection,
} from "./hooks/usePortfolioNavigation";
import NavigationHint from "./navigation/NavigationHint";
import { AboutEngineering } from "./AboutEngineering";
import { useSwipeAction } from "./hooks/useSwipeAction";

type AppId =
  | "about"
  | "projects"
  | "experience"
  | "skills"
  | "snake"
  | "settings"
  | "contact";
const apps = [
  { id: "about", name: "About me", icon: UserRound, color: "blue" },
  { id: "projects", name: "Projects", icon: Folder, color: "amber" },
  {
    id: "experience",
    name: "Experience",
    icon: BriefcaseBusiness,
    color: "violet",
  },
  { id: "skills", name: "Skills", icon: Code2, color: "teal" },
  { id: "snake", name: "Snake", icon: Gamepad2, color: "green" },
  { id: "settings", name: "Appearance", icon: Settings, color: "slate" },
  { id: "contact", name: "Contact", icon: Mail, color: "coral" },
] as const;
const themes = [
  { id: "mint", name: "Graphite", image: "/wallpaper2.jpg", color: "#50e3a4" },
  { id: "green", name: "Forest", image: "/wallpaper1.jpg", color: "#34c779" },
  { id: "blue", name: "Glacier", image: "/wallpaper3.jpg", color: "#287bd1" },
];
function Clock({ large = false }: { large?: boolean }) {
  const [date, setDate] = useState<Date | null>(null);
  useEffect(() => {
    const update = () => setDate(new Date());
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <time>
      {date
        ? date.toLocaleString(
            "en-US",
            large
              ? { hour: "2-digit", minute: "2-digit" }
              : {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                },
          )
        : "Welcome"}
    </time>
  );
}
function AppWindow({
  id,
  front,
  maximized,
  minimized,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  children,
}: {
  id: AppId;
  front: boolean;
  maximized: boolean;
  minimized: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  children: ReactNode;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const drag = useRef<{
    x: number;
    y: number;
    startX: number;
    startY: number;
  } | null>(null);
  const app = apps.find((a) => a.id === id)!;
  return (
    <section
      aria-label={`${app.name} window`}
      hidden={minimized}
      className={`app-window ${front ? "front" : ""} ${maximized ? "maximized" : ""} app-${id}`}
      style={
        {
          "--drag-x": `${position.x}px`,
          "--drag-y": `${position.y}px`,
        } as React.CSSProperties
      }
      onPointerDown={onFocus}
      onFocus={onFocus}
    >
      <header
        className="window-bar"
        onDoubleClick={onMaximize}
        onPointerDown={(event) => {
          if (
            maximized ||
            window.innerWidth < 760 ||
            (event.target as HTMLElement).closest("button")
          )
            return;
          event.currentTarget.setPointerCapture(event.pointerId);
          drag.current = {
            x: event.clientX,
            y: event.clientY,
            startX: position.x,
            startY: position.y,
          };
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          setPosition({
            x: Math.max(
              -window.innerWidth / 3,
              Math.min(
                window.innerWidth / 3,
                drag.current.startX + event.clientX - drag.current.x,
              ),
            ),
            y: Math.max(
              -25,
              Math.min(
                window.innerHeight - 250,
                drag.current.startY + event.clientY - drag.current.y,
              ),
            ),
          });
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <span className="window-app">
          <app.icon size={16} /> {id === "projects" ? "Files" : app.name}
        </span>
        <span className="window-owner">Mudassar Majeed</span>
        <div className="window-controls">
          <button
            aria-label={`Minimize ${app.name}`}
            onDoubleClick={(e) => e.stopPropagation()}
            onClick={onMinimize}
          >
            <Minus size={15} />
          </button>
          <button
            aria-label={`Maximize ${app.name}`}
            onDoubleClick={(e) => e.stopPropagation()}
            onClick={onMaximize}
          >
            <Maximize2 size={13} />
          </button>
          <button
            className="close"
            aria-label={`Close ${app.name}`}
            onDoubleClick={(e) => e.stopPropagation()}
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>
      </header>
      <div className="window-body">{children}</div>
    </section>
  );
}
export default function Portfolio({ projects }: { projects: Project[] }) {
  const [unlocked, setUnlocked] = useState(false);
  const [open, setOpen] = useState<AppId[]>(["projects"]);
  const { location, navigate, back, forward, canBack, canForward } =
    usePortfolioNavigation();
  const fileSection = location.section;
  const selected =
    projects.find((project) => project.slug === location.projectSlug) || null;
  const {
    enabled: soundEnabled,
    play: playSound,
    toggle: toggleSound,
  } = useDesktopSound();
  const unlock = () => {
    if (!unlocked) {
      playSound("unlock");
      setUnlocked(true);
    }
  };
  const [minimized, setMinimized] = useState<AppId[]>([]);
  const [maximized, setMaximized] = useState<AppId[]>([]);
  const [overview, setOverview] = useState(false);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("mint");
  const lock = () => {
    playSound("lock");
    setUnlocked(false);
    setOverview(false);
  };
  const lockGesture = useSwipeAction(lock);
  const unlockGesture = useSwipeAction(unlock);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
  }, [fileSection, selected]);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem("portfolio-theme");
        if (themes.some((t) => t.id === saved)) {
          setTheme(saved!);
        }
      } catch {}
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const changeTheme = (value: string) => {
    setTheme(value);
    try {
      localStorage.setItem("portfolio-theme", value);
    } catch {}
  };
  const focus = (id: AppId) =>
    setOpen((current) =>
      current[current.length - 1] === id
        ? current
        : [...current.filter((item) => item !== id), id],
    );
  const launch = (id: AppId) => {
    const location = [
      "about",
      "projects",
      "experience",
      "skills",
      "contact",
    ].includes(id);
    const windowId = location ? "projects" : id;
    if (location) {
      navigate(id as FileSection);
    }
    focus(windowId);
    setMinimized((current) => current.filter((item) => item !== windowId));
    setOverview(false);
  };
  const front = [...open].reverse().find((id) => !minimized.includes(id));
  const hasMaximizedWindow = Boolean(front && maximized.includes(front));
  const dockHidden = hasMaximizedWindow && !overview;
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (
        !unlocked &&
        event.key === "Enter" &&
        !(
          event.target instanceof HTMLElement &&
          event.target.closest("button,a,input")
        )
      ) {
        playSound("unlock");
        setUnlocked(true);
      }
      if (event.key === "Escape") setOverview(false);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [unlocked, playSound]);
  useEffect(() => {
    const handleNavigation = (event: KeyboardEvent) => {
      if (
        !unlocked ||
        overview ||
        front !== "projects" ||
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      )
        return;
      if (
        event.target instanceof HTMLElement &&
        event.target.closest(
          'input,textarea,select,[contenteditable="true"],[role="slider"],[role="tablist"]',
        )
      )
        return;
      if (event.key === "ArrowLeft" && canBack) {
        event.preventDefault();
        back();
      }
      if (event.key === "ArrowRight" && canForward) {
        event.preventDefault();
        forward();
      }
    };
    window.addEventListener("keydown", handleNavigation);
    return () => window.removeEventListener("keydown", handleNavigation);
  }, [unlocked, overview, front, canBack, canForward, back, forward]);
  const content = (id: AppId) => {
    if (id === "projects")
      return (
        <div className="files-app">
          <aside className="files-sidebar" aria-label="File locations">
            <span>Places</span>
            <button
              className={fileSection === "home" ? "selected" : ""}
              onClick={() => {
                navigate("home");
              }}
            >
              <Home size={17} /> Home
            </button>
            {apps
              .filter((app) =>
                [
                  "about",
                  "projects",
                  "experience",
                  "skills",
                  "contact",
                ].includes(app.id),
              )
              .map((app) => (
                <button
                  key={app.id}
                  className={fileSection === app.id ? "selected" : ""}
                  aria-current={fileSection === app.id ? "page" : undefined}
                  onClick={() => {
                    navigate(app.id as FileSection);
                  }}
                >
                  <app.icon size={17} />
                  {app.name}
                  {app.id === "projects" && <small>{projects.length}</small>}
                </button>
              ))}
            <div className="sidebar-note">
              TypeScript · Node.js
              <br />
              Next.js · PostgreSQL
            </div>
          </aside>
          <div className="file-content" ref={contentRef}>
            <div className="file-toolbar">
              <button
                aria-label="Go back"
                disabled={!canBack}
                onClick={back}
                title="Back (←)"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                aria-label="Go forward"
                title="Forward (→)"
                disabled={!canForward}
                onClick={forward}
              >
                <ArrowRight size={18} />
              </button>
              <span>
                <button
                  className="crumb"
                  onClick={() => {
                    navigate("home");
                  }}
                  aria-label="Home"
                >
                  <Home size={15} />
                </button>
                <ChevronRight size={13} />
                {fileSection === "home"
                  ? "Home"
                  : apps.find((app) => app.id === fileSection)?.name}
                {selected && (
                  <>
                    <ChevronRight size={13} />
                    {selected.title}
                  </>
                )}
              </span>
              <Link
                className="preview-link"
                href={`/preview#${selected?.slug || fileSection}`}
                target="_blank"
                rel="noreferrer"
                title="Read as a page"
              >
                <ScanEye size={17} />
                <span>Read as a page</span>
              </Link>
            </div>
            <nav className="mobile-file-locations" aria-label="File locations">
              {[
                "home",
                "projects",
                "experience",
                "skills",
                "about",
                "contact",
              ].map((section) => (
                <button
                  key={section}
                  aria-current={fileSection === section ? "page" : undefined}
                  onClick={() => {
                    navigate(section as FileSection);
                  }}
                >
                  {section === "home"
                    ? "Home"
                    : apps.find((app) => app.id === section)?.name}
                </button>
              ))}
            </nav>
            {fileSection === "home" ? (
              <div className="file-home">
                <div className="folder-heading">
                  <div>
                    <h1>Your guide to my work</h1>
                    <p>Choose a folder to explore.</p>
                  </div>
                </div>
                <div className="folder-grid">
                  {apps
                    .filter((app) =>
                      [
                        "about",
                        "projects",
                        "experience",
                        "skills",
                        "contact",
                      ].includes(app.id),
                    )
                    .map((app) => (
                      <button
                        className="file-folder"
                        key={app.id}
                        onClick={() => launch(app.id)}
                      >
                        <span className={`app-icon ${app.color}`}>
                          <app.icon size={31} />
                        </span>
                        <strong>{app.name}</strong>
                      </button>
                    ))}
                </div>
              </div>
            ) : fileSection !== "projects" ? (
              content(fileSection)
            ) : selected ? (
              <ProjectDocument project={selected} />
            ) : (
              <>
                <div className="folder-heading">
                  <div>
                    <h1>Projects</h1>
                    <p>
                      Business tools, connected APIs, and real-time products.
                    </p>
                  </div>
                  <span>{projects.length} projects</span>
                </div>
                <div className="folder-grid project-grid">
                  {projects.map((p) => (
                    <button
                      className="file-folder"
                      key={p.title}
                      onClick={() => navigate("projects", p.slug)}
                    >
                      <span className="folder-art">
                        <Folder size={63} strokeWidth={1.25} />
                        <Code2 size={20} />
                      </span>
                      <strong>{p.title}</strong>
                      <small>{p.kind}</small>
                      <p>{p.text}</p>
                      <span className="card-tech">
                        {p.tech.split("·").slice(0, 3).join(" · ")}
                      </span>
                      <span className="card-open">
                        View project <ChevronRight size={14} />
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      );
    if (id === "about")
      return (
        <article className="welcome-app">
          <div className="avatar-mark">
            m<span>.</span>
          </div>
          <h1>
            Mudassar Majeed<span>Full-stack & backend developer.</span>
          </h1>
          <p>
            I build AI-native business software with TypeScript, Node.js,
            Next.js, and PostgreSQL — connecting APIs, agents, background jobs,
            and the Linux infrastructure that runs them.
          </p>
          <div className="welcome-actions">
            <button className="primary" onClick={() => launch("projects")}>
              <Folder size={17} /> Explore my projects
            </button>
            <Link className="preview-link" href="/preview" target="_blank">
              <ScanEye size={16} /> Read as a page
            </Link>
            <button onClick={() => launch("contact")}>
              Let’s talk <ChevronRight size={16} />
            </button>
          </div>
          <AboutEngineering />
          <div className="welcome-footer">
            <span>
              <i /> Open to opportunities
            </span>
            <span>Rawalpindi, Pakistan</span>
          </div>
        </article>
      );
    if (id === "experience") return <ExperienceContent />;
    if (id === "skills") return <SkillsContent />;
    if (id === "snake")
      return <Snake active={unlocked && front === "snake" && !overview} />;
    if (id === "settings")
      return (
        <article className="document-app">
          <h1>Appearance</h1>
          <p className="muted">A wallpaper, a palette, a whole new mood.</p>
          <div className="wallpaper-grid">
            {themes.map((t) => (
              <button
                key={t.id}
                aria-pressed={theme === t.id}
                onClick={() => changeTheme(t.id)}
              >
                <span style={{ backgroundImage: `url(${t.image})` }} />
                <strong>
                  {t.name}
                  <i style={{ background: t.color }} />
                </strong>
                <small>{theme === t.id ? "Selected" : "Use theme"}</small>
              </button>
            ))}
          </div>
          <button
            className="sound-preference"
            data-sound="toggle"
            aria-pressed={soundEnabled}
            onClick={toggleSound}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}{" "}
            Desktop sounds <strong>{soundEnabled ? "On" : "Off"}</strong>
          </button>
          <p className="settings-note">
            Your choice is saved on this device and applies to the entire
            desktop.
          </p>
        </article>
      );
    return <ContactContent />;
  };
  return (
    <main
      className={`desktop ${unlocked ? "is-unlocked" : "is-locked"}`}
      onClickCapture={(event) => {
        const target = (event.target as HTMLElement).closest("button,a");
        if (target && !target.hasAttribute("data-sound")) playSound("tap");
      }}
    >
      <header className="system-bar">
        <button
          className="activities"
          data-sound={!unlocked ? "unlock" : undefined}
          onClick={() => {
            unlock();
            setOverview(!overview);
          }}
          aria-expanded={overview}
        >
          <span className="workspace-dots">
            <i />
            <i />
            <i />
          </span>
          Activities
        </button>
        <button
          className="system-clock"
          onClick={() => unlocked && launch("about")}
        >
          <Clock />
        </button>
        <button
          className="sound-toggle"
          data-sound="toggle"
          aria-label={
            soundEnabled ? "Mute desktop sounds" : "Enable desktop sounds"
          }
          aria-pressed={soundEnabled}
          onClick={toggleSound}
        >
          {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
        </button>
        <button
          className="system-status"
          aria-label="Open appearance settings"
          onClick={() => unlocked && launch("settings")}
        >
          <Wifi size={15} />
          <BatteryFull size={18} />
          <ChevronDown size={12} />
        </button>
      </header>
      <section
        className="lock-screen"
        aria-hidden={unlocked}
        inert={unlocked}
        {...unlockGesture}
      >
        <div className="lock-time">
          <Clock large />
        </div>
        <p>Business software · APIs · AI workflows</p>
        <button className="lock-profile" data-sound="unlock" onClick={unlock}>
          <span className="lock-avatar">m.</span>
          <strong>Mudassar Majeed</strong>
          <span>Full-stack & backend developer</span>
          <span className="unlock-prompt">
            <ArrowUp size={17} /> Click, swipe up, or press Enter
          </span>
        </button>
        <Link className="lock-read-link" href="/preview">
          Browse portfolio as a page <ChevronRight size={15} />
        </Link>
      </section>
      <div
        className={`desktop-session ${hasMaximizedWindow ? "has-maximized-window" : ""}`}
        inert={!unlocked}
        aria-hidden={!unlocked}
      >
        <div className="desktop-label">
          <span>MUDASSAR’S WORKSPACE</span>
          <p>Take a look around.</p>
        </div>
        <div className="desktop-icons">
          {apps
            .filter((a) => ["projects", "experience", "contact"].includes(a.id))
            .map((app) => (
              <button
                className="desktop-shortcut"
                key={app.id}
                onClick={() => launch(app.id)}
              >
                <span className={`app-icon ${app.color}`}>
                  <app.icon size={34} strokeWidth={1.6} />
                </span>
                <span>{app.name}</span>
              </button>
            ))}
        </div>
        <div className="windows-layer">
          {open.map((id) => (
            <AppWindow
              key={id}
              id={id}
              front={front === id}
              minimized={minimized.includes(id)}
              maximized={maximized.includes(id)}
              onFocus={() => focus(id)}
              onClose={() => {
                setOpen((current) => current.filter((a) => a !== id));
              }}
              onMinimize={() => setMinimized((current) => [...current, id])}
              onMaximize={() =>
                setMaximized((current) =>
                  current.includes(id)
                    ? current.filter((a) => a !== id)
                    : [...current, id],
                )
              }
            >
              {content(id)}
            </AppWindow>
          ))}
        </div>
        <nav
          className={`dock ${dockHidden ? "is-hidden" : ""}`}
          aria-label="Applications"
          aria-hidden={dockHidden}
          inert={dockHidden}
        >
          {apps.map((app) => (
            <button
              key={app.id}
              title={app.name}
              aria-label={`Open ${app.name}`}
              aria-current={front === app.id ? "page" : undefined}
              className={open.includes(app.id) ? "running" : ""}
              onClick={() => launch(app.id)}
            >
              <span className={`app-icon ${app.color}`}>
                <app.icon size={27} strokeWidth={1.7} />
              </span>
              <span className="dock-tooltip">{app.name}</span>
            </button>
          ))}
          <span className="dock-separator" />
          <button
            title="Show applications"
            aria-label="Show applications"
            onClick={() => setOverview(!overview)}
          >
            <Grid3X3 size={26} />
          </button>
        </nav>
        <NavigationHint
          active={unlocked && !overview && Boolean(front) && front !== "snake"}
          context={
            front !== "projects"
              ? "window"
              : selected
                ? "project"
                : "navigation"
          }
        />
        <button
          className="desktop-lock-handle"
          onClick={lock}
          {...lockGesture}
          aria-label="Lock desktop. Click or swipe upward."
        >
          <ArrowUp size={14} />
          <LockKeyhole size={13} /> Swipe up to lock
        </button>
        {overview && (
          <section className="overview" aria-label="Applications">
            <button
              className="overview-close"
              aria-label="Close applications"
              onClick={() => setOverview(false)}
            >
              <X />
            </button>
            <div className="launcher-search">
              <Search size={19} />
              <input
                autoFocus
                aria-label="Search applications"
                placeholder="Type to search…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <h1>Make yourself at home.</h1>
            <p>Choose a folder. Discover what’s inside.</p>
            <div className="launcher-apps">
              {apps
                .filter((app) =>
                  app.name.toLowerCase().includes(query.toLowerCase()),
                )
                .map((app) => (
                  <button key={app.id} onClick={() => launch(app.id)}>
                    <span className={`app-icon ${app.color}`}>
                      <app.icon size={37} />
                    </span>
                    <span>{app.name}</span>
                  </button>
                ))}
            </div>
            {!apps.some((app) =>
              app.name.toLowerCase().includes(query.toLowerCase()),
            ) && <p>No applications found. Try “Projects” or “Snake”.</p>}
            <button
              className="lock-action"
              data-sound="lock"
              onClick={() => {
                playSound("lock");
                setUnlocked(false);
                setOverview(false);
              }}
            >
              <LockKeyhole size={16} /> Lock desktop
            </button>
          </section>
        )}
      </div>
    </main>
  );
}
