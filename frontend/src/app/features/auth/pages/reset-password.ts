import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div class="px-6 mb-4 flex items-center gap-3 text-[#216d69]">
        <i class="fa-solid fa-chart-simple text-4xl"></i>
        <h1 class="text-4xl font-bold">FinŁad</h1>
      </div>
      <div class="w-full max-w-md rounded-xl p-8 shadow-2xl">
        <h2 class="text-2xl font-semibold text-black mb-1">Reset Password</h2>
        <p class="text-sm text-zinc-600 mb-6">Enter your new password.</p>
        @if (message()) {
          <div class="p-3 rounded-lg text-sm text-center mb-4" [class.bg-green-100]="done()" [class.bg-red-50]="!done()">
            {{ message() }}
          </div>
        }
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-black/70 mb-1.5">New Password</label>
            <input type="password" formControlName="newPassword"
              class="w-full bg-zinc-100 rounded-lg px-4 py-3 text-black border border-zinc-100 focus:border-[#216d69] focus:outline-none" />
          </div>
          <button type="submit" [disabled]="loading()"
            class="w-full bg-[#216d69] text-white font-semibold py-3 rounded-lg hover:bg-[#2b8c87] disabled:opacity-50">
            {{ loading() ? 'Resetting...' : 'Reset Password' }}
          </button>
        </form>
        @if (done()) {
          <p class="mt-6 text-center text-sm text-zinc-600">
            <a routerLink="/auth/login" class="text-[#216d69] font-semibold hover:underline">Go to Login</a>
          </p>
        }
      </div>
    </div>
  `,
})
export class ResetPasswordComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form = this.fb.nonNullable.group({ newPassword: ['', [Validators.required, Validators.minLength(8)]] });
  message = signal('');
  done = signal(false);
  loading = signal(false);
  private token = '';

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    if (!this.token) {
      this.message.set('Invalid reset link.');
    }
  }

  onSubmit() {
    if (this.form.invalid || !this.token) return;
    this.loading.set(true);
    this.authService.resetPassword(this.token, this.form.getRawValue().newPassword).subscribe({
      next: () => {
        this.message.set('Password has been reset. You can now login.');
        this.done.set(true);
        this.loading.set(false);
      },
      error: (err) => {
        this.message.set(err.error?.message || 'Invalid or expired token.');
        this.loading.set(false);
      },
    });
  }
}
