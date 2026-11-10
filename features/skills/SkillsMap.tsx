"use client";

import {
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  Braces,
  Database,
  Network,
  Pause,
  Play,
  Server,
  Sparkles,
} from "lucide-react";
import { skillGroups } from "./skillGroups";
import styles from "./SkillsMap.module.css";

const icons = [Braces, Database, Sparkles, Server];

export default function SkillsMap() {
  const id = useId();
  const canvas = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const visible = useInView(canvas, { amount: 0.15 });
  const running = visible && !paused && !reduced;
  const group = skillGroups[active];
  const onKey = (event: KeyboardEvent, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % skillGroups.length;
    else if (event.key === "ArrowLeft")
      next = (index + skillGroups.length - 1) % skillGroups.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = skillGroups.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };
  return (
    <section
      className={styles.map}
      aria-label="Engineering skills mind map"
      style={{ "--branch": group.color } as CSSProperties}
    >
      <div className={styles.toolbar}>
        <p>Explore how I build and run applications.</p>
        <button
          aria-pressed={paused}
          disabled={Boolean(reduced)}
          onClick={() => setPaused(!paused)}
          aria-label={
            paused ? "Play workflow animation" : "Pause workflow animation"
          }
        >
          {paused || reduced ? <Play size={15} /> : <Pause size={15} />}
          {reduced ? "Motion reduced" : paused ? "Play" : "Pause"}
        </button>
      </div>
      <div className={styles.canvas} ref={canvas}>
        <div className={styles.hub}>
          <Network size={23} />
          <strong>Full-stack engineering</strong>
        </div>
        <div className={styles.feed} aria-hidden="true">
          <motion.span
            animate={
              running ? { y: [0, 34], opacity: [0, 1, 0] } : { opacity: 0 }
            }
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <LayoutGroup id={id}>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Engineering disciplines"
          >
            {skillGroups.map((item, index) => {
              const Icon = icons[index];
              return (
                <button
                  ref={(node) => {
                    tabs.current[index] = node;
                  }}
                  key={item.id}
                  id={`${id}-tab-${item.id}`}
                  role="tab"
                  aria-selected={active === index}
                  aria-controls={`${id}-panel-${item.id}`}
                  tabIndex={active === index ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => onKey(event, index)}
                  className={styles.tab}
                >
                  {active === index && (
                    <motion.span
                      className={styles.selection}
                      layoutId="selected-discipline"
                      transition={{
                        duration: reduced ? 0 : 0.28,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  )}
                  <Icon size={20} />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={group.id}
            id={`${id}-panel-${group.id}`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${group.id}`}
            tabIndex={0}
            className={styles.panel}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: reduced ? 1 : 0.4 }}
            transition={{ duration: 0.1 }}
          >
            <div className={styles.panelTitle}>
              <h2>{group.verb}</h2>
              <span>{group.title}</span>
            </div>
            <div className={styles.branches}>
              {group.branches.map((branch, index) => (
                <div className={styles.branch} key={branch.name}>
                  <svg
                    className={styles.wire}
                    viewBox="0 0 28 42"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 0 V21 Q1 28 8 28 H28"
                      fill="none"
                      stroke="currentColor"
                      strokeOpacity=".2"
                    />
                    <motion.path
                      d="M1 0 V21 Q1 28 8 28 H28"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      initial={{ pathLength: reduced ? 1 : 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: reduced ? 0 : 0.5,
                        delay: reduced ? 0 : index * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </svg>
                  <h3>{branch.name}</h3>
                  <motion.ul
                    initial={false}
                    animate={
                      reduced
                        ? {}
                        : { clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"] }
                    }
                    transition={{
                      duration: 0.35,
                      delay: index * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {branch.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </motion.ul>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        {skillGroups.map((item, index) =>
          index !== active ? (
            <div
              key={item.id}
              id={`${id}-panel-${item.id}`}
              role="tabpanel"
              aria-labelledby={`${id}-tab-${item.id}`}
              hidden
            />
          ) : null,
        )}
      </div>
    </section>
  );
}
