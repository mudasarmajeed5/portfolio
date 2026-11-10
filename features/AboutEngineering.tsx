import styles from "./ExperienceOverview.module.css";

export function AboutEngineering() {
  return (
    <div className="engineering-profile">
      <ExperienceOverview />
      <div className="engineering-heading">
        <span className="eyebrow">BUILD · INTEGRATE · OPERATE</span>
        <h2>Beyond the interface.</h2>
        <p>
          I build AI-native applications and backend systems, then work with the
          infrastructure that runs them.
        </p>
      </div>
      <div className="engineering-grid">
        <section className="engineering-card">
          <span className="eyebrow">PRODUCT ENGINEERING</span>
          <h3>From workflow to working system</h3>
          <p>
            TypeScript, Node.js, Next.js, and PostgreSQL. Authenticated APIs,
            data models, integrations, background jobs, and tools built around
            real business processes.
          </p>
          <p>
            Clean architecture, clear module boundaries, and separation of
            concerns guide how I structure applications.
          </p>
        </section>
        <section className="engineering-card">
          <span className="eyebrow">AI ENGINEERING</span>
          <h3>AI inside the workflow</h3>
          <p>
            AI-native products, agent harnesses, tool integration, LLM routing,
            and automated jobs. I connect model capabilities to application
            logic and user-facing workflows.
          </p>
          <p>
            Selected work: CIVIC_CONNECT, LeadPulse, Construction AI, and GCR
            Pro.
          </p>
        </section>
        <section className="engineering-card homelab-card">
          <span className="eyebrow">PERSONAL INFRASTRUCTURE</span>
          <h3>I run my own NAS and Linux server.</h3>
          <p>
            I self-host Jellyfin, Nextcloud, and Immich, and manage the services
            and networking behind them.
          </p>
          <div className="skill-chips">
            <span>Linux administration</span>
            <span>Alpine Linux</span>
            <span>Nginx</span>
            <span>Firewalls & ports</span>
            <span>DNS & domains</span>
            <span>Load balancing</span>
            <span>Bash automation</span>
          </div>
          <p>
            Application hosting experience includes Next.js, Supabase, and AWS
            EC2 — connecting application code, server configuration, and network
            communication.
          </p>
        </section>
      </div>
    </div>
  );
}

export function ExperienceOverview() {
  return (
    <section
      className={styles.overview}
      aria-label="Combined development experience"
    >
      <span className="eyebrow">EXPERIENCE</span>
      <figure className={styles.figure}>
        <div
          className={styles.ring}
          role="img"
          aria-label="2.6 years of combined experience: 1.58 years in employed roles and one year of freelance development. Freelance work may overlap employment."
        >
          <div className={styles.center}>
            <span className={styles.value}>2.6</span>
          </div>
        </div>
        <figcaption className={styles.legend}>
          <h2>Years of combined experience</h2>
          <ul>
            <li>
              <i className="pie-frontend" />
              <span>
                Employed development
                <strong>1.58 years · DHA, Khuda Hafiz & Carbonrepro</strong>
              </span>
            </li>
            <li>
              <i className="pie-backend" />
              <span>
                Freelance development
                <strong>1 year · independent client projects</strong>
              </span>
            </li>
          </ul>
        </figcaption>
      </figure>
      <p className={styles.note}>
        Combined experience, rounded to one decimal. Employment overlaps counted
        once; freelance work may overlap employment.
      </p>
    </section>
  );
}
