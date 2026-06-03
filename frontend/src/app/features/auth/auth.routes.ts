import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  { path: 'login',
    loadComponent: () => 
      import('./pages/login').then((m) => m.LoginComponent ) 
  },
  { path: 'register', 
    loadComponent: () => 
      import('./pages/register').then((m) => m.RegisterComponent) 
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
