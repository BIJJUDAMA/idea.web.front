## Requirements

- Bun v1.1+
- Node.js v20+ (LTS recommended)
- Git

# Project Setup Guide

## Fork the Repository

Go to:

🔗 [https://github.com/rev-sin/idea.web.front](https://github.com/rev-sin/idea.web.front)

Click **Fork** (top right corner) to create your own copy of the repository.

---

## Clone the Repository

After forking, clone your forked repository:

```bash
git clone https://github.com/YOUR-USERNAME/idea.web.front.git
```

Then navigate into the project directory:

```bash
cd idea.web.front
```

---

## Install Bun (If Not Installed)

This project uses **Bun** as the package manager.

### macOS / Linux

```bash
curl -fsSL https://bun.sh/install | bash
```

After installation, restart your terminal and verify:

```bash
bun --version
```

### Windows (PowerShell)

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

---

## Install Dependencies

```bash
bun install
```

or

```bash
bun i
```

---

## Run the Development Server

```bash
bun run dev
```

The application will start in development mode.

---

## Build for Production

```bash
bun run build
```

---

> ⚠️ **Important:** Always run the production build before pushing to GitHub or creating a Pull Request to ensure there are no build-time errors.

---
