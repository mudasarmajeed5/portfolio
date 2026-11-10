export const skillGroups = [
  {
    id: "frontend",
    title: "Frontend",
    verb: "Build the interface",
    color: "#91b7f7",
    branches: [
      { name: "Application", skills: ["TypeScript", "React", "Next.js"] },
      {
        name: "Interface & state",
        skills: ["Tailwind CSS", "Zustand", "TanStack Query"],
      },
    ],
  },
  {
    id: "backend",
    title: "Backend & data",
    verb: "Model the business",
    color: "#63dfae",
    branches: [
      {
        name: "Services & jobs",
        skills: [
          "Node.js",
          "Express",
          "REST APIs",
          "Python / Flask",
          "Zod",
          "Inngest",
        ],
      },
      {
        name: "Persistence",
        skills: [
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
        name: "Practices",
        skills: ["Clean architecture", "Git", "Vitest", "Database migrations"],
      },
    ],
  },
  {
    id: "ai",
    title: "AI & integrations",
    verb: "Connect the workflows",
    color: "#c4a4ed",
    branches: [
      {
        name: "AI applications",
        skills: [
          "Agent harnesses",
          "Tool integration",
          "LLM routing",
          "Gemini",
          "OpenRouter",
          "Workflow automation",
        ],
      },
      {
        name: "Access & providers",
        skills: [
          "OAuth 2.0",
          "JWT",
          "Role-based access",
          "Better Auth",
          "NextAuth.js",
          "Webhooks",
          "Stripe",
          "Google APIs",
        ],
      },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    verb: "Run the system",
    color: "#edbf72",
    branches: [
      {
        name: "Hosting & administration",
        skills: [
          "Linux",
          "Alpine Linux",
          "AWS EC2",
          "Nginx",
          "Self-hosting",
          "Bash scripting",
        ],
      },
      {
        name: "Networking",
        skills: ["DNS & domains", "Firewalls & ports", "Load balancing"],
      },
    ],
  },
] as const;
