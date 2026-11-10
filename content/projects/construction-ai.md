---
title: Construction AI
liveUrl: https://app.fulltakeoff.com
category: Construction · AI workflows
description: Turns construction plans into reviewable quantities, cost estimates, and progress-linked billing.
technologies: TypeScript · Node.js · Express · PostgreSQL · Drizzle ORM · Gemini · Next.js
---
## My contribution

Full-stack development focused on plan processing, measured takeoff, and the data flow from estimates to billing.

## What it does

- Processes plan sheets and detects trade-specific items for quantity takeoff.
- Connects measured quantities with cost codes, pricing, and bid preparation.
- Links earned quantities to schedules of values and pay applications.

## Engineering highlights

- Combines deterministic wall geometry with Gemini vision detections, keeping quantity calculation in application code.
- Validates detections against firm-owned cost codes; unresolved items do not become invented estimate lines.
- Routes vision quantities through human review and verified sheet calibration before downstream use.
