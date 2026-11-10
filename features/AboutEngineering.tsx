export function AboutEngineering() {
  return (
    <div className="engineering-profile">
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
        <section className="engineering-card experience-overview">
          <span className="eyebrow">PROFESSIONAL EXPERIENCE</span>
          <h3>19 months across employed roles</h3>
          <figure className="experience-pie">
            <div
              className="experience-donut"
              role="img"
              aria-label="19 unique calendar months: 13 frontend-only months at DHA, 3 overlapping frontend and backend months at DHA and Khuda Hafiz, and 3 healthcare engineering months at Carbonrepro."
            >
              <span>
                <strong>19</strong>
                <small>months</small>
              </span>
            </div>
            <figcaption>
              <ul>
                <li>
                  <i className="pie-frontend" />
                  <span>
                    Frontend · DHA<strong>13 months</strong>
                  </span>
                </li>
                <li>
                  <i className="pie-backend" />
                  <span>
                    Frontend + backend · concurrent roles
                    <strong>3 months</strong>
                  </span>
                </li>
                <li>
                  <i className="pie-health" />
                  <span>
                    Healthcare engineering · Carbonrepro
                    <strong>3 months</strong>
                  </span>
                </li>
              </ul>
            </figcaption>
          </figure>
          <p className="experience-method">
            Calendar months covered by the listed roles, counted inclusively.
            Overlapping employment counted once. Freelance projects are
            additional; excluded from this total because their dates are
            unspecified.
          </p>
        </section>
      </div>
    </div>
  );
}
