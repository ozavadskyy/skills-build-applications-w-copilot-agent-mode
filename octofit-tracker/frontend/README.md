# OctoFit Frontend

This React 19 presentation tier uses `react-router-dom` and calls the backend API routes under:

`https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`

## Environment configuration

Define `VITE_CODESPACE_NAME` for Codespaces in `octofit-tracker/frontend/.env.local`:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is unset, the app safely falls back to:

`http://localhost:8000/api`

This prevents invalid URLs such as `https://undefined-8000...`.
