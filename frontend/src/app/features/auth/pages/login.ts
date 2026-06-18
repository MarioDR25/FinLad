import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
/* bg-[#f7fdfd] */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `<div class="min-h-screen flex flex-col items-center justify-center bg-white px-4">
    <div class="px-6 mb-4 flex items-center gap-3  text-[#216d69]">
        <i class="fa-solid fa-chart-simple text-4xl"></i>
        <h1 class="text-4xl font-bold">FinŁad</h1>
    </div>

    <div class="w-full max-w-md rounded-xl p-8 shadow-2xl">
      <h2 class="text-2xl font-semibold text-black mb-1">Welcome Back</h2>
      <p class="text-sm text-zinc-600 mb-6">Sign in to your account.</p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-black/70 mb-1.5">Email Address</label>
          <input
            type="email"
            formControlName="email"
            class="w-full bg-zinc-100 rounded-lg px-4 py-3 text-black placeholder:text-zinc-400 border border-zinc-100 focus:border-[#216d69] focus:outline-none transition-colors"
            placeholder="name@example.com"
          />
        </div>

        <div>
          <div class="flex justify-between items-center mb-1.5">
            <label class="block text-sm font-medium text-black/70">Password</label>
            <a routerLink="/auth/forgot-password" class="text-xs text-[#216d69] hover:underline">
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            formControlName="password"
            class="w-full bg-zinc-100  rounded-lg px-4 py-3 text-black placeholder:text-zinc-400 border border-zinc-100 focus:border-[#216d69] focus:outline-none transition-colors"
            placeholder="••••••••"
          />
        </div>

        
        @if (hasText()) {
          <div class="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg text-center my-2">
            {{ message() }}
          </div>
        }

        <button
          type="submit"
          class="w-full bg-[#216d69] text-white font-semibold py-3 rounded-lg hover:bg-[#34d399] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          [disabled]="loading()"
        >
          {{ loading() ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <p class=" text-center py-3 text-xs text-zinc-500 uppercase tracking-wider">or</p>
      

      <button
        type="button"
        
        class="w-full flex items-center justify-center bg-white  font-medium py-3 rounded-lg border border-zinc-400 hover:bg-blue-400 hover:border-zinc-600 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        [disabled]="loading()"
      >
       
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48" class="mr-2.5">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24c0-1.61-.15-3.16-.42-4.69H24v8.87h12.66c-.54 2.89-2.18 5.34-4.63 6.99l7.18 5.57C43.35 36.31 46.5 30.72 46.5 24z"/>
            <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.18-5.57c-2.11 1.42-4.81 2.3-8.71 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
        
        <span>{{ loading() ? 'Connecting...' : 'Continue with Google' }}</span>
      </button>


      <p class="mt-6 text-center text-sm text-zinc-600">
        Don't have an account?
        <a routerLink="/auth/register" class="text-[#216d69] font-semibold hover:underline">Register here</a>
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
  loading = signal<boolean>(false);
 
  form: FormGroup = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    console.log('form valid:', this.form.valid, 'form value:', this.form.value);
    if (this.form.invalid) {
      this.message.set('Please enter a valid email and password.');
      return;
    }
    this.loading.set(true);
    this.message.set(''); 

    this.authService.login(this.form.value).subscribe({
      next: (res) => {
        console.log('respuesta de login', res);
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      },
      error: (err) => {
        console.log('error completo:', err);
        console.log('error body:', err.error);
        this.message.set(err.error?.message || 'Error desconocido');
        this.loading.set(false);
      },
    });
  }
}
