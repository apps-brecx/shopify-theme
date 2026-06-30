# Shopify Theme Development Guide

This repository contains the Shopify theme for our online store.

The **main** branch is connected to the live Shopify theme by GitHub integration. **Do not push directly to the `main` branch.**

## Branch Structure

- `main` → Connected to the online store (production)
- `developer-1` → Developer 1's branch
- `developer-2` → Developer 2's branch
- `developer-3` → Developer 3's branch

Each developer should work only on their own branch.

---

# Initial Setup

## 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

## 2. Checkout Your Branch

Developer 1

```bash
git checkout developer-1
```

Developer 2

```bash
git checkout developer-2
```

Developer 3

```bash
git checkout developer-3
```

---

# Install Shopify CLI

Install the latest Shopify CLI globally.

```bash
npm install -g @shopify/cli@latest
```

Verify the installation.

```bash
shopify version
```

---

# Connect to the Store

Login to Shopify.

```bash
shopify auth login
```

---

# Run the Theme Locally

Start the local development server.

```bash
shopify theme dev
```

This will:

- Create a development preview
- Watch for file changes
- Automatically reload the theme in your browser

---

# Daily Workflow

## 1. Pull the Latest Changes

Always pull before starting work.

```bash
git pull origin <your-branch>
```

Example:

```bash
git pull origin developer-1
```

---

## 2. Create Your Changes

Edit the theme files.

Preview changes using:

```bash
shopify theme dev
```

---

## 3. Stage Changes

```bash
git add .
```

---

## 4. Commit Changes

```bash
git commit -m "Describe your changes"
```

---

## 5. Push Your Branch

```bash
git push origin <your-branch>
```

Example:

```bash
git push origin developer-1
```

---

# Merging into Main

Do **not** push directly to `main`.

After completing your work:

1. Push your branch.
2. Create a Pull Request.
3. Review the changes.
4. Merge into `main`.

Once merged, the GitHub integration will automatically update the connected Shopify theme.

---

# Switching Branches

```bash
git checkout developer-1
```

or

```bash
git checkout main
```

---

# Getting the Latest Main Changes

After changes are merged into `main`, update your branch.

```bash
git checkout developer-1
git pull origin main
git merge main
```

Resolve any merge conflicts if they occur, then push your updated branch.

```bash
git push origin developer-1
```

---

# Useful Git Commands

Check current branch

```bash
git branch
```

Check repository status

```bash
git status
```

View commit history

```bash
git log --oneline
```

Fetch latest changes

```bash
git fetch
```

Pull latest changes

```bash
git pull
```

Push changes

```bash
git push
```

---

# Important Notes

- Never push directly to the `main` branch.
- Always pull the latest changes before starting work.
- Test your changes using `shopify theme dev`.
- Commit frequently with meaningful commit messages.
- Push only to your assigned developer branch.
- Merge into `main` only through a Pull Request.