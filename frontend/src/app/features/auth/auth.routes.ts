import { Routes } from '@angular/router';
import { noAuthGuard } from '../../core/guards/no-auth.guard';

export const authRoutes: Routes = [
  { path: 'login',
    canActivate: [noAuthGuard],
    loadComponent: () => import('./pages/login').then(m => m.LoginComponent)
  },
  { path: 'register',
    canActivate: [noAuthGuard],
    loadComponent: () => import('./pages/register').then(m => m.RegisterComponent)
  },
  { path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password').then(m => m.ForgotPasswordComponent)
  },
  { path: 'reset-password',
    loadComponent: () => import('./pages/reset-password').then(m => m.ResetPasswordComponent)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
