"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUp,
  BatteryFull,
  BriefcaseBusiness,
  ChevronDown,
  ChevronRight,
  Code2,
  Folder,
  Gamepad2,
  Grid3X3,
  Home,
  LockKeyhole,
  Mail,
  Maximize2,
  Minus,
  Search,
  Settings,
  UserRound,
  Volume2,
  Wifi,
  X,
} from "lucide-react";
import Snake from "./Snake";

type Project = {
  title: string;
  kind: string;
  text: string;
  tech: string;
  image?: string;
  body: string;
};
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
function Cover({ image, title }: { image?: string; title: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="project-cover">
      {image && !failed ? (
        <Image
          src={image}
          alt={title}
          fill
          unoptimized
          onError={() => setFailed(true)}
        />
      ) : (
        <>
          <Folder size={52} strokeWidth={1.4} />
          <span>{title}</span>
        </>
      )}
    </div>
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
          <app.icon size={16} /> {app.name}
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
  const [open, setOpen] = useState<AppId[]>(["about"]);
  const [minimized, setMinimized] = useState<AppId[]>([]);
  const [maximized, setMaximized] = useState<AppId[]>([]);
  const [overview, setOverview] = useState(false);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("mint");
  const [selected, setSelected] = useState<Project | null>(null);
  const touch = useRef(0);
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
    focus(id);
    setMinimized((current) => current.filter((item) => item !== id));
    setOverview(false);
  };
  const front = [...open].reverse().find((id) => !minimized.includes(id));
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (!unlocked && event.key === "Enter") setUnlocked(true);
      if (event.key === "Escape") setOverview(false);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [unlocked]);
  const content = (id: AppId) => {
    if (id === "projects")
      return (
        <div className="files-app">
          <aside className="files-sidebar">
            <span>Places</span>
            <button onClick={() => setSelected(null)}>
              <Home size={17} /> Home
            </button>
            <button className="selected" onClick={() => setSelected(null)}>
              <Folder size={17} /> Projects <small>{projects.length}</small>
            </button>
            <button onClick={() => launch("experience")}>
              <BriefcaseBusiness size={17} /> Experience
            </button>
            <button onClick={() => launch("skills")}>
              <Code2 size={17} /> Skills
            </button>
            <div className="sidebar-note">
              Built with curiosity.
              <br />
              Made to be explored.
            </div>
          </aside>
          <div className="file-content">
            <div className="file-toolbar">
              <button
                aria-label="Back to projects"
                disabled={!selected}
                onClick={() => setSelected(null)}
              >
                <ArrowLeft size={18} />
              </button>
              <span>
                <Home size={15} /> <ChevronRight size={13} /> Projects{" "}
                {selected && (
                  <>
                    <ChevronRight size={13} />
                    {selected.title}
                  </>
                )}
              </span>
            </div>
            {selected ? (
              <article className="project-detail">
                <Cover
                  key={selected.image || selected.title}
                  image={selected.image}
                  title={selected.title}
                />
                <span className="eyebrow">{selected.kind}</span>
                <h1>{selected.title}</h1>
                <p>{selected.text}</p>
                <div className="skill-chips">
                  {selected.tech.split("·").map((t) => (
                    <span key={t}>{t.trim()}</span>
                  ))}
                </div>
                {selected.body.split(/\n\s*\n/).map((paragraph, index) => {
                  const image = paragraph.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
                  return image ? (
                    <Cover
                      key={index}
                      image={image[2]}
                      title={image[1] || selected.title}
                    />
                  ) : paragraph.trim() !== selected.text ? (
                    <p key={index}>{paragraph.replace(/^#+\s*/, "")}</p>
                  ) : null;
                })}
              </article>
            ) : (
              <>
                <div className="folder-heading">
                  <div>
                    <h1>Projects</h1>
                    <p>A collection of things I’ve built.</p>
                  </div>
                  <span>{projects.length} folders</span>
                </div>
                <div className="folder-grid">
                  {projects.map((p) => (
                    <button
                      className="file-folder"
                      key={p.title}
                      onClick={() => setSelected(p)}
                    >
                      <span className="folder-art">
                        <Folder size={63} strokeWidth={1.25} />
                        <Code2 size={20} />
                      </span>
                      <strong>{p.title}</strong>
                      <small>{p.kind}</small>
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
          <span className="eyebrow">WELCOME TO MY DESKTOP</span>
          <h1>
            Mudassar Majeed<span>Software engineer & curious builder.</span>
          </h1>
          <p>
            I build thoughtful full-stack products, scalable backends, and
            useful AI experiences. Make yourself at home — my work is just a
            folder away.
          </p>
          <div className="welcome-actions">
            <button className="primary" onClick={() => launch("projects")}>
              <Folder size={17} /> Explore my projects
            </button>
            <button onClick={() => launch("contact")}>
              Let’s talk <ChevronRight size={16} />
            </button>
          </div>
          <div className="welcome-footer">
            <span>
              <i /> Open to opportunities
            </span>
            <span>Rawalpindi, Pakistan</span>
          </div>
        </article>
      );
    if (id === "experience")
      return (
        <article className="document-app">
          <span className="eyebrow">THE JOURNEY SO FAR</span>
          <h1>Experience</h1>
          <p className="muted">
            Building real products. Learning from real teams.
          </p>
          <div className="experience-list">
            {[
              {
                date: "Jul – Sep 2026",
                role: "Software Engineer Intern",
                company: "Carbonrepro · Houston, Texas",
                text: "Led 5 frontend developers and integrated AI healthcare agents using Next.js, Python/Flask, and WebRTC. Worked on patient intake, dashboards, and clinical workflows.",
              },
              {
                date: "Jul – Sep 2025",
                role: "Backend Developer",
                company: "Khuda Hafiz · Islamabad",
                text: "Built production REST APIs and authentication with Node.js, Express, and TypeScript. Led 8 interns and was recognized as Best Intern among 12 developers.",
              },
              {
                date: "Jan – Apr 2025",
                role: "Frontend Developer",
                company: "DHA Gujranwala · Remote",
                text: "Worked with the Director of Marketing to modernize the web platform, building responsive React applications and reusable components.",
              },
            ].map((job) => (
              <div className="job" key={job.company}>
                <BriefcaseBusiness size={21} />
                <div>
                  <time>{job.date}</time>
                  <h2>{job.role}</h2>
                  <strong>{job.company}</strong>
                  <p>{job.text}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      );
    if (id === "skills")
      return (
        <article className="document-app">
          <span className="eyebrow">MY TOOLBOX</span>
          <h1>Skills & education</h1>
          <p className="muted">The tools behind the work.</p>
          {[
            {
              name: "Languages & frontend",
              items: [
                "TypeScript",
                "JavaScript",
                "React",
                "Next.js",
                "Tailwind CSS",
              ],
            },
            {
              name: "Backend & data",
              items: [
                "Node.js",
                "Express",
                "Python / Flask",
                "REST APIs",
                "PostgreSQL",
                "MongoDB",
                "Prisma",
                "Drizzle",
                "Convex",
              ],
            },
            {
              name: "Infrastructure & quality",
              items: [
                "AWS EC2",
                "Docker",
                "Linux",
                "Nginx",
                "CI/CD",
                "Git",
                "Vitest",
                "API testing",
              ],
            },
          ].map((group) => (
            <section className="skill-group" key={group.name}>
              <h2>{group.name}</h2>
              <div className="skill-chips">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </section>
          ))}
          <div className="education">
            <strong>Air University Islamabad</strong>
            <p>B.S. Software Engineering · GPA 3.39</p>
          </div>
        </article>
      );
    if (id === "snake")
      return <Snake active={front === "snake" && !overview} />;
    if (id === "settings")
      return (
        <article className="document-app">
          <span className="eyebrow">MAKE YOURSELF AT HOME</span>
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
          <p className="settings-note">
            Your choice is saved on this device and applies to the entire
            desktop.
          </p>
        </article>
      );
    return (
      <article className="document-app contact-app">
        <div className="contact-icon">
          <Mail size={36} />
        </div>
        <span className="eyebrow">LET’S BUILD SOMETHING USEFUL</span>
        <h1>Say hello.</h1>
        <p>
          Have a project in mind or an opportunity to share?
          <br />
          I’d love to hear about it.
        </p>
        <a className="primary" href="mailto:mudasarmajeed5@proton.me">
          <Mail size={17} /> Send me an email
        </a>
        <div className="contact-links">
          <a
            href="https://github.com/mudasarmajeed5"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/mudasarmajeed5"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
        </div>
        <small>English & Urdu · Based in Pakistan</small>
      </article>
    );
  };
  return (
    <main className="desktop">
      <header className="system-bar">
        <button
          className="activities"
          onClick={() => {
            if (!unlocked) setUnlocked(true);
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
          className="system-status"
          aria-label="Open appearance settings"
          onClick={() => unlocked && launch("settings")}
        >
          <Wifi size={15} />
          <Volume2 size={15} />
          <BatteryFull size={18} />
          <ChevronDown size={12} />
        </button>
      </header>
      {!unlocked ? (
        <section
          className="lock-screen"
          onTouchStart={(e) => {
            touch.current = e.touches[0].clientY;
          }}
          onTouchEnd={(e) => {
            if (touch.current - e.changedTouches[0].clientY > 75)
              setUnlocked(true);
          }}
        >
          <div className="lock-time">
            <Clock large />
          </div>
          <p>Your next idea starts here.</p>
          <button className="lock-profile" onClick={() => setUnlocked(true)}>
            <span className="lock-avatar">m.</span>
            <strong>Mudassar Majeed</strong>
            <span>Software engineer</span>
            <span className="unlock-prompt">
              <ArrowUp size={17} /> Swipe up or press Enter
            </span>
          </button>
        </section>
      ) : (
        <>
          <div className="desktop-label">
            <span>MUDASSAR’S WORKSPACE</span>
            <p>Take a look around.</p>
          </div>
          <div className="desktop-icons">
            {apps
              .filter((a) =>
                ["projects", "experience", "contact"].includes(a.id),
              )
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
          <nav className="dock" aria-label="Applications">
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
          <span className="desktop-credit">
            A little desktop. A lot of possibilities.
          </span>
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
                onClick={() => {
                  setUnlocked(false);
                  setOverview(false);
                }}
              >
                <LockKeyhole size={16} /> Lock desktop
              </button>
            </section>
          )}
        </>
      )}
    </main>
  );
}
