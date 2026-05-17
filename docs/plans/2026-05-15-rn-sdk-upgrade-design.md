# RN SDK Upgrade Design

## Goal

Resolve the remaining frontend issues by upgrading the release branch from Expo SDK 51 to the current SDK line and revalidating dependency security, Expo compatibility, web build, and E2E behavior.

## Context

Open issues #43 and #47 are linked: safe SDK 51 package alignment is already merged into `release/2026-05-15`, but `expo-doctor` still rejects Xcode 26.5 compatibility and `npm audit` still reports vulnerabilities that require major dependency movement. Expo documentation recommends upgrading the `expo` package first, then running `npx expo install --fix` and `npx expo-doctor`.

## Approach

Upgrade in the existing `release/2026-05-15` branch/PR #49 so the E2E harness and local API configuration stay in scope. Target Expo SDK 55, then let Expo CLI select matching React, React Native, React Native Web, and Expo module versions. Keep application behavior unchanged unless upgrade diagnostics expose required API changes.

## Verification

Run `npm ci`, `npx expo install --check`, `npx expo-doctor`, `npm audit`, `npm run lint`, `npm run build:web`, and Playwright E2E against the local backend API. Only close #43/#47 when the relevant commands confirm the issues are resolved or document any remaining upstream blocker.
