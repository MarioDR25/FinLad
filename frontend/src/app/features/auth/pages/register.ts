import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `<div class="min-h-screen flex flex-col items-center justify-center bg-white px-4">
    <div class="px-6 mb-4 flex items-center gap-3  text-[#216d69]">
        <i class="fa-solid fa-chart-simple text-4xl"></i>
        <h1 class="text-4xl font-bold">FinŁad</h1>
    </div>

    <div class="w-full max-w-md  shadow-2xl rounded-lg p-8">
      <h2 class="text-2xl font-semibold text-black mb-1">Create Account</h2>
      <p class="text-sm text-zinc-600 mb-6">Enter your details to start managing your wealth.</p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-black/70 mb-1.5">First Name</label>
          <input
            type="text"
            formControlName="firstName"
            class="w-full bg-zinc-100 border rounded-lg px-4 py-3  placeholder:text-zinc-400 border-zinc-100 focus:border-[#216d69] focus:outline-none transition-colors"
            placeholder="John"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-black/70 mb-1.5">
            Last Name <span class="text-zinc-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            formControlName="lastName"
            class="w-full bg-zinc-100 border rounded-lg px-4 py-3  placeholder:text-zinc-400 border-zinc-100 focus:border-[#216d69] focus:outline-none transition-colors"
            placeholder="Doe"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-black/70 mb-1.5">Email Address</label>
          <input
            type="email"
            formControlName="email"
            class="w-full bg-zinc-100 border rounded-lg px-4 py-3  placeholder:text-zinc-400 border-zinc-100 focus:border-[#216d69] focus:outline-none transition-colors"
            placeholder="name@example.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-black/70 mb-1.5">Password</label>
          <input
            type="password"
            formControlName="password"
            class="w-full bg-zinc-100 border rounded-lg px-4 py-3  placeholder:text-zinc-400 border-zinc-100 focus:border-[#216d69] focus:outline-none transition-colors"
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
          class="w-full bg-[#216d69] text-white font-semibold py-3 rounded-lg hover:bg-[#2b8c87] active:scale-[0.98] transition-all cursor-pointer"
          [disabled]="loading"
        >
          {{ loading ? 'Creating account...' : 'Create Account' }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-zinc-400">
        Already have an account?
        <a routerLink="/auth/login" class="text-[#216d69] font-semibold hover:underline">Login here</a>
      </p>

    </div>
  </div> `,
})



export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  message = signal('');
  hasText = computed(() => this.message().trim().length > 0);

  form: FormGroup = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  loading = false;

  onSubmit(): void {
    if (this.form.invalid) {
      this.message.set('Please fill in all required fields correctly.');
      return;
    }
    this.loading = true;
    this.message.set('');
    this.authService.register(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      },
      error: (err) => {
        this.message.set(err.error?.message || 'Registration failed');
        this.loading = false;
      },
    });
  }
}
