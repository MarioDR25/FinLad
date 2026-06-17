import { Component, computed, inject } from '@angular/core';
import { FinanceDataService } from '../../../core/services/finance-data.service';

@Component({
  selector: 'app-ai-input',
  standalone: true,
  template: `
    <section class="relative">
      <div class="absolute -inset-0.5  "></div>
      <div class="relative flex items-center bg-white border border-[#216d69] rounded-full px-6 py-4  focus-within:border-[#4edea3] transition-all">
      
        <input #inputIA type="text" class="w-full bg-transparent border-none outline-none text-base text-black placeholder-[#216d69]"
          placeholder="Describe tu movimiento... (ej: 'gasté 45 zl en comida con mi tarjeta')" />
        <button (click)="onCreateTransaction(inputIA)" [disabled]="loading()"
          class="ml-4 w-10 h-10 rounded-full text-[#216d69]  flex items-center justify-center hover:scale-105 active:scale-95 transition-transform text-lg disabled:opacity-50">
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
  private svc = inject(FinanceDataService);

  loading = this.svc.createLoading;
  isError = computed(() => this.svc.createError() !== null);

  message = computed(() => {
    const err = this.svc.createError();
    if (err) return err;
    return '';
  });

  hasText = computed(() => this.message().length > 0);

  onCreateTransaction(input: HTMLInputElement): void {
    const value = input.value.trim();
    if (!value) return;
    this.svc.createTransaction(value);
    input.value = '';
  }
}
