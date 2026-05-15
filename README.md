# moneycontrol-rn-app
React Native app with Django-Rest-Framework API

## Local API configuration

The app reads its API base URL from `EXPO_PUBLIC_API_URL`.

```bash
cp .env.example .env
npm run web:local
```

Without `EXPO_PUBLIC_API_URL`, the app falls back to the production API at `https://mncntrl.ru`.
Playwright E2E tests default to `http://127.0.0.1:8000`.

## E2E tests

Run browser smoke, auth/onboarding, and core CRUD integration tests:

```bash
npm run test:e2e
```

Auth integration tests expect the local API at `http://127.0.0.1:8000` and the API container name `mc-local-api` for test-user cleanup and email verification setup. Override with `EXPO_PUBLIC_API_URL` or `E2E_API_CONTAINER` if needed.

## ☕ Support

You can support me so that there will be more good open source projects in the future
<p align="center" style="padding: 10px 0 20px 0">
  <a href="https://www.buymeacoffee.com/n1kko777" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="50" width="220">
  </a>
</p>
