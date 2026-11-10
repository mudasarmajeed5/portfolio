---
title: GCR Pro
repository: https://github.com/mudasarmajeed5/gcr-pro
category: Education · Google integrations
description: Brings Google Classroom courses, deadlines, study assistance, and instructor communication into one workspace.
technologies: Next.js · React · TypeScript · MongoDB · Mongoose · NextAuth.js · Gemini
---
## My contribution

Full-stack development across the Classroom dashboard, API integrations, document workflows, and AI-assisted study tools.

## What it does

- Organizes courses, assignments, submission status, announcements, and materials.
- Processes uploaded PDF and DOCX assignments for Gemini-assisted study support.
- Provides instructor email composition, global search, and an installable PWA.

## Engineering highlights

- Uses Google OAuth through NextAuth.js, with automatic token refresh for Classroom access.
- Stores application data in MongoDB and uploaded documents in GridFS.
- Fetches Classroom resources in parallel and caches dashboard data to avoid repeated API requests.
