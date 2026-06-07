import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `<div class="min-h-screen flex flex-col items-center justify-center bg-[#09090b] px-4">
    <h1 class="text-3xl font-bold text-[#4edea3] mb-8 tracking-tight">FinŁad</h1>

    <div class="w-full max-w-md bg-[#18181b] border border-zinc-800 rounded-lg p-8">
      <h2 class="text-2xl font-semibold text-zinc-100 mb-1">Create Account</h2>
      <p class="text-sm text-zinc-400 mb-6">Enter your details to start managing your wealth.</p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-zinc-300 mb-1.5">First Name</label>
          <input
            type="text"
            formControlName="firstName"
            class="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:border-[#4edea3] focus:outline-none transition-colors"
            placeholder="John"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-zinc-300 mb-1.5">
            Last Name <span class="text-zinc-600 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            formControlName="lastName"
            class="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:border-[#4edea3] focus:outline-none transition-colors"
            placeholder="Doe"
          />
        </div>

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
          {{ loading ? 'Creating account...' : 'Create Account' }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-zinc-400">
        Already have an account?
        <a routerLink="/auth/login" class="text-[#4edea3] font-semibold hover:underline">Login here</a>
      </p>

    </div>
  </div> `,
})



export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form: FormGroup = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  loading = false;

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.authService.register(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
