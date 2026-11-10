"use client";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { AboutEngineering } from "./AboutEngineering";
import type { Project } from "@/lib/projects";
import {
  ExperienceContent,
  SkillsContent,
  ContactContent,
  ProjectDocument,
} from "./ResumeContent";
export default function FullPagePreview({ projects }: { projects: Project[] }) {
  useEffect(() => {
    try {
      const theme = localStorage.getItem("portfolio-theme");
      if (theme && ["mint", "green", "blue"].includes(theme))
        document.documentElement.setAttribute("data-theme", theme);
    } catch {}
  }, []);
  return (
    <main id="home" className="full-preview">
      <header className="preview-nav">
        <Link href="/">
          <ArrowLeft size={16} /> Back to desktop
        </Link>
        <nav aria-label="Portfolio sections">
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <section id="about" className="preview-intro">
        <h1>
          Mudassar Majeed
          <span>
            Business software.
            <br />
            From API to interface.
          </span>
        </h1>
        <p>
          I build AI-native business applications, backend systems, and the
          infrastructure that runs them. TypeScript, Node.js, Next.js, and
          PostgreSQL — with hands-on Linux administration and self-hosting.
        </p>
        <a className="primary" href="#projects">
          Explore five projects ↗
        </a>{" "}
        <a className="preview-contact" href="mailto:mudasarmajeed5@proton.me">
          <Mail size={17} /> Let’s talk
        </a>
      </section>
      <section aria-label="About my engineering work">
        <AboutEngineering />
      </section>
      <section id="experience">
        <ExperienceContent />
      </section>
      <section id="projects" className="preview-projects">
        <h2>Projects</h2>
        <nav className="project-index" aria-label="Project index">
          {projects.map((project) => (
            <a key={project.slug} href={`#${project.slug}`}>
              {project.title} ↗
            </a>
          ))}
        </nav>
        {projects.map((project) => (
          <section key={project.slug} id={project.slug}>
            <ProjectDocument project={project} />
          </section>
        ))}
      </section>
      <section id="skills">
        <SkillsContent />
      </section>
      <section id="contact">
        <ContactContent />
      </section>
      <footer className="preview-footer">
        © {new Date().getFullYear()} Mudassar Majeed
      </footer>
    </main>
  );
}
