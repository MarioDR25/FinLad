# FinLad

Personal finance management app powered by AI. Log your income and expenses using natural language through a chat assistant — no manual forms.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | .NET 9 (ASP.NET Core Web API, SignalR) |
| Frontend | Angular 21 (Tailwind CSS, Chart.js, ng2-charts) |
| Database | PostgreSQL (Supabase) |
| Auth | JWT (Bearer tokens) |
| AI | DeepSeek API |
| CI | GitHub Actions |

## Features

- [x] User registration & login (JWT)
- [x] AI transaction parsing (natural language to structured data)
- [x] Dashboard with real-time charts (line + doughnut)
- [x] Wallet management with dynamic balances
- [x] Transaction history with year filtering
- [x] Analytics page (expenses by category, monthly breakdown)
- [x] Real-time updates via SignalR
- [x] Transfer support (move money between wallets)
- [x] Responsive design (mobile + desktop)
- [x] CI pipeline (build + test on push)
- [ ] Password reset
- [ ] Budget tracking
- [ ] Deployment

> **Status:** In active development.

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

Backend: `http://localhost:5000` | Frontend: `http://localhost:4200` | Swagger: `http://localhost:5000/swagger`
