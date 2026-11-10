---
title: LeadPulse
category: Lead management software
description: Keeps every lead accountable, from first WhatsApp message to follow-up, payment, and appointment.
technologies: Next.js · TypeScript · PostgreSQL · Drizzle ORM · Better Auth · Inngest
---
## My contribution

Full-stack development on a multi-tenant CRM, connecting lead ownership, automated follow-up, and customer integrations.

## What it does

- Assigns one accountable owner per lead, with acknowledgement deadlines and automatic escalation.
- Provides configurable pipelines, customer records, absence reassignment, and a recovery queue.
- Connects WhatsApp, Google Calendar, email alerts, and Stripe Checkout in test mode.

## Engineering highlights

- Uses PostgreSQL transactions and assignment versions to keep lead routing and escalation consistent.
- Runs durable Inngest timers with a scheduled backstop for missed deadlines.
- Scopes records to workspaces and permissions; records changes in an append-only audit log.
- Verifies Stripe webhooks and deduplicates events inside a transaction before updating payment state.
