"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
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
  const canvas = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const visible = useInView(canvas, { amount: 0.1 });
  const running = visible && !paused && !reducedMotion;

  useEffect(() => {
    const measure = () => {
      if (!canvas.current || !hub.current) return;
      const bounds = canvas.current.getBoundingClientRect();
      const root = hub.current.getBoundingClientRect();
      const x = root.left + root.width / 2 - bounds.left;
      const y = root.bottom - bounds.top;
      setPaths(
        nodes.current.map((node) => {
          if (!node) return "";
          const rect = node.getBoundingClientRect();
          const endX = rect.left + rect.width / 2 - bounds.left;
          const endY = rect.top - bounds.top;
          const middle = endY - 20;
          return `M ${x} ${y} V ${middle} H ${endX} V ${endY}`;
        }),
      );
    };
    const observer = new ResizeObserver(measure);
    if (canvas.current) observer.observe(canvas.current);
    nodes.current.forEach((node) => {
      if (node) observer.observe(node);
    });
    measure();
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.map} aria-label="Engineering skills mind map">
      <div className={styles.toolbar}>
        <span>How the pieces connect</span>
        <button
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
          disabled={Boolean(reducedMotion)}
          aria-label={
            paused ? "Play workflow animation" : "Pause workflow animation"
          }
        >
          {paused || reducedMotion ? <Play size={14} /> : <Pause size={14} />}
          {reducedMotion
            ? "Reduced motion"
            : paused
              ? "Play motion"
              : "Pause motion"}
        </button>
      </div>
      <div className={styles.canvas} ref={canvas}>
        <svg className={styles.connections} aria-hidden="true">
          {paths.map((d, index) => (
            <g key={skillGroups[index].id}>
              <path
                d={d}
                fill="none"
                stroke={skillGroups[index].color}
                strokeOpacity="0.25"
                strokeWidth="1.5"
              />
              {running && (
                <motion.path
                  d={d}
                  fill="none"
                  stroke={skillGroups[index].color}
                  strokeWidth="2"
                  strokeDasharray="4 20"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -48 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              )}
            </g>
          ))}
        </svg>
        <div className={styles.hub} ref={hub}>
          <Network size={22} />
          <div>
            <strong>Full-stack engineering</strong>
            <span>Interface → services → intelligence → infrastructure</span>
          </div>
        </div>
        <div className={styles.groups}>
          {skillGroups.map((group, index) => {
            const Icon = icons[index];
            return (
              <section
                key={group.id}
                ref={(node) => {
                  nodes.current[index] = node;
                }}
                className={styles.group}
                style={{ "--branch": group.color } as CSSProperties}
                aria-labelledby={`skill-${group.id}`}
              >
                <header>
                  <span className={styles.icon}>
                    <Icon size={20} />
                  </span>
                  <div>
                    <span className={styles.verb}>{group.verb}</span>
                    <h2 id={`skill-${group.id}`}>{group.title}</h2>
                  </div>
                </header>
                <div className={styles.branches}>
                  {group.branches.map((branch) => (
                    <div className={styles.branch} key={branch.name}>
                      <h3>{branch.name}</h3>
                      <ul>
                        {branch.skills.map((skill) => (
                          <li key={skill}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
