# RN SDK Upgrade Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade the RN app release branch to the current Expo SDK line and close frontend issues #43 and #47 when verified.

**Architecture:** Keep the app managed by Expo with `app.json`, EAS config, Expo web export, and Playwright E2E. Use Expo CLI for compatible package resolution instead of hand-pinning every SDK package.

**Tech Stack:** Expo, React Native, React, npm lockfile, Playwright, EAS config, GitHub Issues/PRs.

---

### Task 1: Baseline and upgrade dependencies

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

**Step 1:** Run `npm ci` to confirm the current release branch installs.

**Step 2:** Run `npm install expo@^55.0.0`.

**Step 3:** Run `npx expo install --fix` to align React, React Native, React Native Web, Expo modules, and supported native packages.

**Step 4:** Run `npm install` if needed to settle the lockfile.

**Step 5:** Inspect `package.json` and `package-lock.json` for unintended package removals.

**Step 6:** Commit as `chore: upgrade expo sdk`.

### Task 2: Fix upgrade breakages

**Files:**
- Modify only files required by diagnostics.

**Step 1:** Run `npx expo-doctor`.

**Step 2:** If it fails, read the full diagnostic and identify the root cause before changing files.

**Step 3:** Apply the smallest compatible fix.

**Step 4:** Re-run `npx expo-doctor`.

**Step 5:** Commit any required code/config changes.

### Task 3: Verify app behavior

**Files:**
- No planned source edits.

**Step 1:** Run `npx expo install --check`.

**Step 2:** Run `npm audit`.

**Step 3:** Run `npm run lint`.

**Step 4:** Run `npm run build:web`.

**Step 5:** Start the backend API locally and run `CI=1 EXPO_PUBLIC_API_URL=http://127.0.0.1:8000 EXPO_WEB_PORT=8082 npm run test:e2e`.

**Step 6:** Clean generated artifacts such as `dist`, `test-results`, and `playwright-report`.

### Task 4: Update GitHub state

**Files:**
- No repo file changes unless release notes need an update.

**Step 1:** Push `release/2026-05-15`.

**Step 2:** Update PR #49 with the final verification matrix.

**Step 3:** Close #43 and #47 only if the relevant verification commands pass.
