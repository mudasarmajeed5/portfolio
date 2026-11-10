---
title: CIVIC_CONNECT
repository: https://github.com/developerzohaib786/aurex-repo
category: Civic services
description: A resident services portal for reporting issues, applying for permits, and tracking city responses.
technologies: Next.js · TypeScript · Node.js · Express · PostgreSQL · Prisma
---
## My contribution

Full-stack development as part of a three-person team, connecting resident workflows with staff and administrator dashboards.

## What it does

- Tracks service requests from submission to resolution, with attachments and public or internal comments.
- Handles permit reviews, PDF approval certificates, and event registration with capacity limits.
- Gives departments SLA tracking, escalation alerts, analytics, and CSV exports.

## Engineering highlights

- Role-based API guards separate citizen, staff, department admin, and super admin access.
- JWT access and refresh tokens support authenticated sessions; Prisma models the request and permit lifecycle.
- Next.js dashboards use Zustand and an Axios client to connect frontend state with the Express API.
