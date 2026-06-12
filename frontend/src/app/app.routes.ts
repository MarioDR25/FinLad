import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { MainLayout } from './layout/main-layout';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: '',
    canActivate: [authGuard],
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard) },
      { path: 'wallets', loadComponent: () => import('./features/wallets/wallets').then(m => m.WalletsPage) },
      { path: 'analytics', loadComponent: () => import('./features/analytics/analytics').then(m => m.AnalyticsPage) },
      { path: 'transactions', loadComponent: () => import('./features/transactions/transactions').then(m => m.TransactionsPage) },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
