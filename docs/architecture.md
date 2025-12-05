# Architecture

**There is monorepo-like structure in the project.**

&nbsp;

### _None_ is divided into three core parts with different JavaScript runtimes:

-   **Shared** — _Pnpm_. That is just a package named _@none/shared_ from `tsc && pnpm pack`.

-   **Backend** — _Bun_.
-   **Frontend** — _Node_ and _Pnpm_.

&nbsp;

### How to update shared and

-   Edit only src folder.

-   If you have added a new file in src, just import this in `index.ts` that is in src root.

-   Run the `pnpm build` in `shared`. (it runs `tsc && pnpm pack`).
-   If you want to work with the backend folder, run this in root: `cd backend` and `bun upshared`.

-   If you want to work with the frontend folder, run this in root: `cd backend` and `pnpm upshared`.

### Scripts explanation

There were many troubles with _pnpm-workspace_, linking and _verdaccio_.
So there is only one way to update `shared` package and notice `frontend` and `backend` about it:

-   Run many strange scripts.

-   Sometimes restart the TypeScript server in IDE.

#### All scripts in the project:

-   `bun upshared` in backend - `bun rm @none/shared && bun install && bun add ../shared/none-shared-__VERSION__.tgz && bun install`.

-   `pnpm upshared` in frontend = `pnpm remove @none/shared && pnpm install && pnpm add ../shared/none-shared-__VERSION__.tgz && pnpm install`

To update shared fast from the project root, run:

```bash
cd shared; pnpm build; cd ../backend; bun upshared; cd ../frontend; pnpm upshared; cd ..
```
