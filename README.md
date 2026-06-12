<h1 align="center">FinLad</h1>
<p align="center"><b>Personal finance, powered by AI.</b></p>
<p align="center">Log your income and expenses using natural language. No manual forms.</p>

---

## How It Works

1. **Type** what you spent or earned in plain language
2. **AI** parses your message into a structured transaction
3. **Dashboard** updates in real time with charts and balances

> *"gasté 45 PLN en el almuerzo con mi tarjeta"* → instant transaction, categorized and saved.

## Tech Stack

| | |
|---|---|
| **Backend** | .NET 9 — ASP.NET Core Web API, SignalR, Entity Framework Core |
| **Frontend** | Angular 21 — TypeScript, Tailwind CSS, Chart.js |
| **Database** | PostgreSQL via Supabase |
| **Auth** | JWT Bearer |
| **AI** | DeepSeek API |
| **Real-time** | SignalR |
| **CI/CD** | GitHub Actions |

## Screens

| Dashboard | Analytics | Transactions |
|:---:|:---:|:---:|
| Wallet cards, AI input, charts, recent activity | Expenses by category, monthly income vs expenses | Full history with year filter |

## Getting Started

```bash
git clone https://github.com/MarioDR25/FinLad.git
cd FinLad

# Backend
cd backend
dotnet run --project src/FinLad.Api
# → http://localhost:5000

# Frontend
cd frontend
npm install
npm start
# → http://localhost:4200
```

Swagger docs at `http://localhost:5000/swagger`.
