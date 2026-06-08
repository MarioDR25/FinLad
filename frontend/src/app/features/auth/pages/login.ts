import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `<div class="min-h-screen flex flex-col items-center justify-center bg-[#09090b] px-4">
    <h1 class="text-3xl font-bold text-[#4edea3] mb-8 tracking-tight">FinŁad</h1>

    <div class="w-full max-w-md bg-[#18181b] border border-zinc-800 rounded-lg p-8">
      <h2 class="text-2xl font-semibold text-zinc-100 mb-1">Welcome Back</h2>
      <p class="text-sm text-zinc-400 mb-6">Sign in to your account.</p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-zinc-300 mb-1.5">Email Address</label>
          <input
            type="email"
            formControlName="email"
            class="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:border-[#4edea3] focus:outline-none transition-colors"
            placeholder="name@example.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-zinc-300 mb-1.5">Password</label>
          <input
            type="password"
            formControlName="password"
            class="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:border-[#4edea3] focus:outline-none transition-colors"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-[#10b981] text-[#00422b] font-semibold py-3 rounded-lg hover:bg-[#34d399] active:scale-[0.98] transition-all"
          [disabled]="loading"
        >
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>
      @if (hasText()) {
        <p class="text-red-500 text-sm">{{ message() }}</p>
      }

      <p class="mt-6 text-center text-sm text-zinc-400">
        Don't have an account?
        <a
          routerLink="/auth/register"
          (click)="debugClick()"
          class="text-[#4edea3] font-semibold hover:underline"
          >Register here</a
        >
      </p>
    </div>
  </div>`,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  message = signal<string>('');
  hasText = computed(() => this.message().trim().length > 0);
  loading = false;
 
  form: FormGroup = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  debugClick() {
    console.log('clicked');
  }

  onSubmit(): void {
    console.log('form valid:', this.form.valid, 'form value:', this.form.value);
    if (this.form.invalid) {
      this.message.set('Please enter a valid email and password.');
      return;
    }
    this.loading = true;
    this.authService.login(this.form.value).subscribe({
      next: (res) => {
        console.log('respuesta de login', res);
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      },
      error: (err) => {
        console.log('error completo:', err);
        console.log('error body:', err.error);
        this.message.set(err.error?.message || 'Error desconocido');
        this.loading = false;
      },
    });
  }
}
