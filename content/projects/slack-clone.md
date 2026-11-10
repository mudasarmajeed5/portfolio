---
title: Slack Clone
repository: https://github.com/mudasarmajeed5/slack-cwa
category: Real-time collaboration
description: A team chat app with shared workspaces, channels, direct messages, and threaded conversations.
technologies: Next.js · React · TypeScript · Convex · Convex Auth · Tailwind CSS
---
## My contribution

Full-stack implementation of a Slack-style collaboration app using Next.js and Convex queries and mutations.

## What it does

- Supports workspace invitations, admin and member roles, channels, and direct conversations.
- Includes rich-text messages, image attachments, threaded replies, and emoji reactions.
- Offers Google, GitHub, and password sign-in through Convex Auth.

## Engineering highlights

- Uses reactive Convex queries to update conversations as messages change.
- Models workspace membership, messages, threads, and reactions with typed schemas and query indexes.
- Checks authenticated membership and message ownership before edits and deletion.
