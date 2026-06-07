# FinLad

Personal finance management app powered by AI. Log your income and expenses using natural language through a chat assistant — no manual forms.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | .NET 9 (ASP.NET Core Web API, SignalR) |
| Frontend | Angular 21 (Tailwind CSS, Angular Material, Chart.js) |
| Database | PostgreSQL (Supabase) |
| Auth | JWT (Bearer tokens) |
| AI | DeepSeek API |

## Features (in progress)

- [x] User registration & login (JWT)
- [x] Dashboard with charts (Chart.js)
- [x] Wallet management
- [x] Transaction & category entities
- [ ] AI chat assistant for transaction input
- [ ] Real-time dashboard updates (SignalR)
- [ ] Analytics & reports
- [ ] Budget tracking

> **Status:** In active development. Not ready for production use.

## Getting Started

```bash
# Backend
cd backend
dotnet run --project src/FinLad.Api

# Frontend
cd frontend
npm install
npm start
```

Backend runs on `http://localhost:5000`, frontend on `http://localhost:4200`.
