# Installation

Firstly, you need to have bun and pnpm on your enviroment.

Clone the repository:

```bash
git clone https://github.com/a-marigold/none
cd none
```

## Client (next js, pnpm)

```bash
# Enter the `frontend` folder
cd frontend

# Install dependencies
pnpm install

# Run the dev server
pnpm dev
```

<details>
	<summary>One string in powershell</summary>

    ```bash
    cd frontend; pnpm install; pnpm dev
    ```

</details>

## Server (bun)

```bash
# Enter the `backend` folder
cd backend

# Install dependencies
bun install

# Run the dev server
bun run dev
```

<details>
	<summary>One string in powershell</summary>

    ```bash
    cd backend; bun install; bun run dev
    ```

</details>

# Enviroment

## Client

```bash
# Your API origin
NEXT_PUBLIC_API_ORIGIN='https://none-g6fi.onrender.com'
```

## Server

```bash
# Prisma
DATABASE_URL='...'
AIVEN_CA_CERT='...' # Your prisma CA certificate. For example, certificate from aiven cloude

# Redis
REDIS_URL='...'

# Cloudinary variables:
CLODUDINARY_CLOUD_NAME='...'
CLOUDINARY_API_KEY='...'
CLOUDINARY_API_SECRET='...'

# Cron secret key used on /cron/wake route
CRON_SECRET='...'

# JWT secret
JWT_SECRET='...'

# Port for docker (random value)
PORT='...'

# Optional flags
PRODUCTION='true' # Used for enable and disable some optional settings, such as logger in fastify
```
