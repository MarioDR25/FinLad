import { Component, computed, inject, signal, viewChild, ElementRef } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-ai-input',
  standalone: true,
  template: `
    <section class="relative">
      <div class="absolute -inset-0.5 bg-linear-to-r from-[#4edea3]/20 to-[#adc6ff]/20 rounded-full blur opacity-20"></div>
      <div class="relative flex items-center bg-[#1a211d] rounded-full px-6 py-4 border border-[#3c4a42] focus-within:border-[#4edea3] transition-all">
        <span class="text-[#4edea3] mr-4 text-lg">✨</span>
        <input #inputIA type="text" class="w-full bg-transparent border-none outline-none text-base text-[#dde4dd] placeholder-[#bbcabf]/40"
          placeholder="Describe tu movimiento... (ej: 'gasté 45 zl en comida con mi tarjeta')" />
        <button (click)="onCreateTransaction(inputIA.value)" [disabled]="loading()"
          class="ml-4 w-10 h-10 rounded-full bg-[#4edea3] text-[#003824] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform text-lg disabled:opacity-50">
          ➤
        </button>
      </div>
      @if (hasText()) {
        <p class="text-center mt-1 text-sm"
          [class.text-yellow-300]="isError()"
          [class.text-[#4edea3]]="!isError()">
          {{ message() }}
        </p>
      }
    </section>
  `,
})
export class AiInput {
  private dashboardService = inject(DashboardService);

  message = signal('');
  hasText = computed(() => this.message().trim().length > 0);
  loading = signal(false);
  isError = signal(false);

  onCreateTransaction(input: string): void {
    if (input.trim().length === 0) {
      this.message.set('Describe your transaction first');
      this.isError.set(true);
      return;
    }

    this.loading.set(true);
    this.message.set('');
    this.isError.set(false);

    this.dashboardService.createTransaction(input).subscribe({
      next: (res) => {
        this.message.set(`Done! ${res.type === 'Expense' ? '-' : '+'}${res.amount.toFixed(2)} PLN — ${res.description}`);
        this.isError.set(false);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err.error.message, 'soy el error')
        this.message.set(err.error?.error || 'Something went wrong. Try again.');
        this.isError.set(true);
        this.loading.set(false);
      },
    });
  }
}

