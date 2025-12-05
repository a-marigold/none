# Project Structure

This document outlines the high-level structure of the **None** messenger project.

---

## Root (`/`)

```bash


/
├─ .github/workflows # CI/CD pipelines with github actions
├─ backend/ # Server: Fastify, bun
├─ frontend/ # Client: Next js, React, pnpm
└─ shared/ # Schemas, types and utilities used on server and client
└─ ...other
```

## Client (`/frontend`)

```bash
/
├─ src/
│ ├─ app/ # Next js App Router folder with only components and the like
│ ├─ contants/ # Unchangeable such as themes, lists
│ ├─ types/ # General client types
│ ├─ hooks/ # Custom React hooks
│ ├─ lib/ # Logic like API clients, stream emitters and the like
│ ├─ store/ # Client storage like zustand (the project uses zustand)
│ ├─ UI/ # Pure UI components
│ ├─ public/ # Default folder with static files like images, icons, fonts
│ ├─ styles/ # Reusable CSS and SCSS like mixins
│ └─ shared/ # Reusable logic, types, constants
└─ ...other
```
