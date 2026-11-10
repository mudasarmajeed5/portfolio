"use client";

import { useState } from "react";
import Image from "next/image";
import { Building2, FolderOpen, Mail } from "lucide-react";
import type { Project } from "@/lib/projects";

export function Cover({ image, title }: { image?: string; title: string }) {
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
          <FolderOpen size={52} strokeWidth={1.5} />
          <span>{title}</span>
        </>
      )}
    </div>
  );
}
export function ProjectDocument({ project }: { project: Project }) {
  return (
    <article className="project-detail">
      {project.image && (
        <Cover
          key={project.image}
          image={project.image}
          title={project.title}
        />
      )}
      <span className="eyebrow">{project.kind}</span>
      <h1>{project.title}</h1>
      <p>{project.text}</p>
      {project.repository && (
        <a
          className="project-source"
          href={project.repository}
          target="_blank"
          rel="noreferrer"
        >
          View source on GitHub ↗
        </a>
      )}
      <div className="skill-chips">
        {project.tech.split("·").map((t) => (
          <span key={t}>{t.trim()}</span>
        ))}
      </div>
      {project.body.split(/\n\s*\n/).map((paragraph, index) => {
        const image = paragraph.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (image)
          return (
            <Cover
              key={index}
              image={image[2]}
              title={image[1] || project.title}
            />
          );
        if (paragraph.trim() === project.text) return null;
        if (/^[-*] /.test(paragraph))
          return (
            <ul key={index}>
              {paragraph
                .split("\n")
                .filter(Boolean)
                .map((line, i) => (
                  <li key={i}>{line.replace(/^[-*] /, "")}</li>
                ))}
            </ul>
          );
        if (paragraph.startsWith("#"))
          return <h2 key={index}>{paragraph.replace(/^#+\s*/, "")}</h2>;
        return <p key={index}>{paragraph}</p>;
      })}
    </article>
  );
}
export function ExperienceContent() {
  const jobs = [
    {
      date: "Jul 2026 – Sep 2026",
      role: "Software Engineer Intern",
      company: "Carbonrepro · Houston, Texas, US",
      items: [
        "Coordinated a five-person frontend team through feature development, code reviews, and Git workflows.",
        "Integrated AI healthcare agents with Next.js, Python/Flask, and WebRTC for patient intake and receptionist workflows.",
      ],
    },
    {
      date: "Jul 2025 – Sep 2025",
      role: "Backend Developer",
      company: "Khuda Hafiz · Air University E-9, Islamabad",
      items: [
        "Built REST APIs, authentication, and external integrations with Node.js, Express, and TypeScript.",
        "Led eight developer interns and received the Best Intern award for technical delivery and team leadership.",
      ],
    },
    {
      date: "January 2025 – April 2026",
      role: "Frontend Developer",
      company: "DHA Gujranwala · Gujranwala (Remote)",
      items: [
        "Built responsive React interfaces for the web platform, working directly with the Director of Marketing.",
        "Created reusable frontend components and connected business REST APIs to customer-facing workflows.",
      ],
    },
    {
      date: "Approximately one year · project-based",
      role: "Freelance Developer",
      company: "Independent · Remote",
      items: [
        "Delivered web development projects for clients, translating requirements into interfaces and API integrations.",
        "Handled implementation, feedback, and iteration across project delivery.",
      ],
    },
  ];
  return (
    <article className="document-app">
      <span className="eyebrow">THE JOURNEY SO FAR</span>
      <h1>Experience</h1>
      <p className="muted">
        Frontend delivery, backend APIs, and full-stack product development.
      </p>
      <div className="experience-layout">
        <div className="experience-list">
          {jobs.map((job) => (
            <section className="job" key={job.company}>
              <Building2 size={21} />
              <div>
                <time>{job.date}</time>
                <h2>{job.role}</h2>
                <strong>{job.company}</strong>
                <ul>
                  {job.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
        <aside
          className="experience-summary"
          aria-label="Experience and technical focus"
        >
          <span className="eyebrow">AT A GLANCE</span>
          <div className="experience-fact">
            <strong>Jan 2025 — Sep 2026</strong>
            <span>Employed roles shown here · includes overlapping dates</span>
          </div>
          <div className="experience-fact">
            <strong>~1 year</strong>
            <span>Freelance development · project-based</span>
          </div>
          <h2>Engineering focus</h2>
          <div className="focus-flow">
            <div>
              <CodeFocus label="Interfaces" detail="React · Next.js" />
            </div>
            <div>
              <CodeFocus
                label="APIs & workflows"
                detail="Node.js · Express · Inngest"
              />
            </div>
            <div>
              <CodeFocus
                label="Data & access"
                detail="PostgreSQL · MongoDB · OAuth"
              />
            </div>
          </div>
          <p>
            Applied across CRM, civic services, construction, education, and
            team chat.
          </p>
        </aside>
      </div>
    </article>
  );
}
function CodeFocus({ label, detail }: { label: string; detail: string }) {
  return (
    <>
      <strong>{label}</strong>
      <span>{detail}</span>
    </>
  );
}
export function SkillsContent() {
  const groups = [
    {
      name: "Backend & workflows",
      items: [
        "TypeScript",
        "Node.js",
        "Express",
        "Next.js API routes",
        "REST APIs",
        "Zod",
        "Inngest",
        "Python / Flask",
      ],
    },
    {
      name: "Data & persistence",
      items: [
        "PostgreSQL",
        "Prisma",
        "Drizzle ORM",
        "MongoDB / Mongoose",
        "Supabase",
        "Convex",
        "GridFS",
      ],
    },
    {
      name: "Authentication & integrations",
      items: [
        "OAuth 2.0",
        "JWT",
        "Role-based access",
        "Better Auth",
        "NextAuth.js",
        "Webhooks",
        "Stripe",
        "Google APIs",
        "Gemini",
      ],
    },
    {
      name: "Frontend",
      items: ["React", "Next.js", "Tailwind CSS", "Zustand", "TanStack Query"],
    },
    {
      name: "Development practices",
      items: [
        "Git",
        "Vitest",
        "Database migrations",
        "Schema validation",
        "Background jobs",
      ],
    },
  ];
  return (
    <article className="document-app">
      <span className="eyebrow">MY TOOLBOX</span>
      <h1>Skills & education</h1>
      <p className="muted">The tools behind the work.</p>
      {groups.map((group) => (
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
}
export function ContactContent() {
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
}
