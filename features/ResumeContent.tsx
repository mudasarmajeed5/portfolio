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
      <Cover
        key={project.image || project.slug}
        image={project.image}
        title={project.title}
      />
      <span className="eyebrow">{project.kind}</span>
      <h1>{project.title}</h1>
      <p>{project.text}</p>
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
        "Led a team of 5 frontend developers, coordinating feature development, code reviews, Git workflows, and frontend architecture.",
        "Developed and integrated AI healthcare agents into a production healthcare management platform using Next.js, Python/Flask, and WebRTC.",
        "Contributed to patient intake, receptionist workflows, patient/admin dashboards, RCM, localization, and AI-assisted clinical workflows.",
      ],
    },
    {
      date: "Jul 2025 – Sep 2025",
      role: "Backend Developer",
      company: "Khuda Hafiz · Air University E-9, Islamabad",
      items: [
        "Built production-ready backend features and RESTful APIs with Node.js, Express.js, and TypeScript; implemented secure authentication and API integrations.",
        "Led a team of 8 developer interns; recognized as Best Intern among 12 developers for technical contributions, leadership, and consistent delivery.",
      ],
    },
    {
      date: "Jan 2025 – Apr 2025",
      role: "Frontend Developer",
      company: "DHA Gujranwala · Gujranwala (Remote)",
      items: [
        "Worked directly with the Director of Marketing to modernize the web platform; built responsive React apps integrating business REST APIs.",
        "Built reusable components, improving maintainability, performance, and user experience.",
      ],
    },
  ];
  return (
    <article className="document-app">
      <span className="eyebrow">THE JOURNEY SO FAR</span>
      <h1>Experience</h1>
      <p className="muted">Building real products. Learning from real teams.</p>
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
    </article>
  );
}
export function SkillsContent() {
  const groups = [
    {
      name: "Backend & APIs",
      items: [
        "Node.js",
        "Express.js",
        "REST APIs",
        "Schema Validation",
        "Middleware",
        "TypeScript",
        "Python/Flask",
      ],
    },
    { name: "Frontend", items: ["Next.js", "React", "Tailwind CSS"] },
    {
      name: "Databases",
      items: [
        "PostgreSQL",
        "MongoDB",
        "Prisma",
        "Drizzle ORM",
        "Supabase",
        "Convex",
      ],
    },
    {
      name: "DevOps & practices",
      items: [
        "AWS EC2",
        "Docker",
        "Linux",
        "Nginx",
        "DNS",
        "CI/CD",
        "Git",
        "Vitest",
        "Integration Testing",
        "Agile",
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
