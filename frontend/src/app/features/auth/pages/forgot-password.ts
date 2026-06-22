import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div class="px-6 mb-4 flex items-center gap-3 text-[#216d69]">
        <i class="fa-solid fa-chart-simple text-4xl"></i>
        <h1 class="text-4xl font-bold">FinŁad</h1>
      </div>
      <div class="w-full max-w-md rounded-xl p-8 shadow-2xl">
        <h2 class="text-2xl font-semibold text-black mb-1">Forgot Password</h2>
        <p class="text-sm text-zinc-600 mb-6">Enter your email and we'll send you a reset link.</p>
        @if (message()) {
          <div class="p-3 rounded-lg text-sm text-center mb-4" [class.bg-green-100]="sent()" [class.bg-red-50]="!sent()">
            {{ message() }}
          </div>
        }
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-black/70 mb-1.5">Email Address</label>
            <input type="email" formControlName="email"
              class="w-full bg-zinc-100 rounded-lg px-4 py-3 text-black border border-zinc-100 focus:border-[#216d69] focus:outline-none" />
          </div>
          <button type="submit" [disabled]="loading()"
            class="w-full bg-[#216d69] text-white font-semibold py-3 rounded-lg hover:bg-[#2b8c87] disabled:opacity-50">
            {{ loading() ? 'Sending...' : 'Send Reset Link' }}
          </button>
        </form>
        <p class="mt-6 text-center text-sm text-zinc-600">
          <a routerLink="/auth/login" class="text-[#216d69] font-semibold hover:underline">Back to Login</a>
        </p>
      </div>
    </div>
  `,
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  form = this.fb.nonNullable.group({ email: ['', [Validators.required, Validators.email]] });
  message = signal('');
  sent = signal(false);
  loading = signal(false);

  onSubmit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.authService.forgotPassword(this.form.getRawValue().email).subscribe({
      next: () => {
        this.message.set('If the email exists, a reset link has been sent.');
        this.sent.set(true);
        this.loading.set(false);
      },
      error: () => {
        this.message.set('Something went wrong. Try again.');
        this.loading.set(false);
      },
    });
  }
}
