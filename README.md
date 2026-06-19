<h1 align="center">
  <img src="https://img.icons8.com/fluency/48/money-bag.png" width="48" alt="FinLad" />
  <br/>
  FinLad
</h1>

<p align="center">
  <b>Personal finance management powered by AI</b><br/>
  <sub>Say goodbye to manual spreadsheets. Type naturally. Let AI do the rest.</sub>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/.NET-9.0-512BD4?logo=dotnet" alt=".NET" />
  <img src="https://img.shields.io/badge/Angular-21-DD0031?logo=angular" alt="Angular" />
  <img src="https://img.shields.io/badge/PostgreSQL-Supabase-3ECF8E?logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/AI-DeepSeek-4F46E5?logo=openai" alt="DeepSeek" />
  <img src="https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=githubactions" alt="CI" />
</p>

---

## What is FinLad?

FinLad is a web application for managing personal finances without the friction of traditional form-based apps. Instead of filling out fields manually, you simply type what happened in natural language — *"received my salary of 5,000 PLN deposited to my bank"* — and the AI engine parses, categorizes, and records the transaction automatically.

The app supports income, expenses, and transfers between wallets, updates balances in real time via SignalR, and provides visual analytics through interactive charts. Everything is protected behind JWT authentication with a responsive interface built with Angular and Tailwind CSS.

---

## How It Works

```
User types: "gasté 45 PLN en almuerzo con mi tarjeta de crédito"
     │
     ▼
┌─────────────┐    ┌──────────────┐    ┌──────────────┐
│  Angular    │──▶│  .NET API    │───▶│  DeepSeek AI │
│  Input UI   │    │  POST /ai    │    │  Parses text │
└─────────────┘    └──────┬───────┘    └──────┬───────┘
                          │                   │
                          │  ┌────────────────┘
                          ▼  ▼
                   ┌──────────────┐
                   │ Transaction  │
                   │ created +    │
                   │ wallet update│
                   └──────┬───────┘
                          │
                          ▼
                   ┌──────────────┐
                   │  SignalR Hub │
                   │  broadcasts  │
                   └──────┬───────┘
                          │
                          ▼
                   ┌──────────────┐
                   │ Dashboard    │
                   │ updates in   │
                   │ real time    │
                   └──────────────┘
```

---

## Features

### Authentication & Security
- JWT-based registration and login
- Google Sign-In integration
- Bearer token authentication on every request
- Route guards protecting authenticated pages

### AI Transaction Processing
- Parse natural language into structured transactions
- Supports **Income**, **Expense**, and **Transfer** types
- Auto-detects categories, wallets, amounts, and dates
- Input validation prevents gibberish and incomplete data

### Wallet Management
- 4 default wallets per user: Bank Account, Credit Card, Cash, Digital Wallet
- Real-time balance tracking
- Transfer funds between wallets
- Balance validation prevents overspending

### Dashboard
- Total balance across all wallets
- Wallet cards with live balances
- AI input bar for quick transaction entry
- Doughnut chart: expenses breakdown by category
- Line chart: monthly income vs expenses comparison
- Recent transactions table
- Toast notifications for real-time updates

### Analytics & History
- **Analytics page**: full charts with year selector
- **Transactions page**: complete history with date, category, type, wallet, and amount
- **Wallets page**: detailed view of all wallets

### Responsive Design
- Mobile-first with Tailwind CSS
- Collapsible sidebar for desktop
- Bottom navigation bar for mobile
- All charts and tables adapt to screen size

---

## Architecture

```
finlad-app/
├── backend/
│   └── src/
│       ├── Finlad.Domain/         # Entities, enums, base classes
│       └── FinLad.Api/            # Controllers, services, hubs, data
│           ├── Controllers/       # Auth, Wallet, Transaction
│           ├── Services/          # AiService, TokenService, etc.
│           ├── Hubs/              # SignalR TransactionHub
│           └── configurations/    # JwtSettings, AiSettings
│
└── frontend/
    └── src/app/
        ├── core/                  # Shared services, guards, models
        ├── features/              # auth, dashboard, wallets, analytics, transactions
        └── layout/                # Sidebar, mobile nav, main layout
```

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Backend Framework | .NET 9 (ASP.NET Core) |
| Frontend Framework | Angular 21 |
| Language | C# 12 / TypeScript 5 |
| Database | PostgreSQL (Supabase) |
| ORM | Entity Framework Core 9 |
| Authentication | JWT Bearer Tokens |
| Real-time | SignalR |
| AI/LLM | DeepSeek API (OpenAI-compatible) |
| Charts | Chart.js via ng2-charts |
| Styling | Tailwind CSS 4 |
| Testing | xUnit (.NET) |
| CI/CD | GitHub Actions |

---

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | No | Register new user |
| `POST` | `/api/auth/login` | No | Login, returns JWT |
| `POST` | `/api/auth/google` | No | Google Sign-In, returns JWT |
| `GET` | `/api/wallet` | Yes | Get user wallets |
| `GET` | `/api/transaction?year=` | Yes | Get transactions (optional year filter) |
| `POST` | `/api/transaction/ai` | Yes | Parse NL into transaction |
| `GET` | `/api/transaction/by-category` | Yes | Expenses grouped by category |
| `GET` | `/api/transaction/monthly?type=&year=` | Yes | Monthly income/expense breakdown |

---

## Getting Started

```bash
git clone https://github.com/MarioDR25/FinLad.git
cd FinLad

# Backend
cd backend
cp src/FinLad.Api/appsettings.Example.json src/FinLad.Api/appsettings.json
# Configure your settings, then:
dotnet run --project src/FinLad.Api

# Frontend
cd frontend
npm install
npm start
```
