import { Component, effect, inject, signal } from '@angular/core';
import { FinanceDataService } from '../../../core/services/finance-data.service';

@Component({
  selector: 'app-transaction-toast',
  standalone: true,
  template: `
    @if (visible()) {
      <div class="fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg transition-all animate-pulse"
        [class.bg-white]="!isError()"
        [class.bg-red-50]="isError()"
        [class.border]="true"
        [class.border-zinc-200]="!isError()"
        [class.border-red-200]="isError()">
        <i class="fa-solid text-xl"
          [class.fa-circle-check]="!isError()"
          [class.text-green-500]="!isError() && type() === 'Income'"
          [class.text-red-400]="!isError() && type() !== 'Income'"
          [class.fa-circle-exclamation]="isError()"
          [class.text-red-500]="isError()"></i>
        <span class="text-sm font-medium" [class.text-black]="!isError()" [class.text-red-600]="isError()">
          {{ message() }}
        </span>
      </div>
    }
  `,
})
export class TransactionToast {
  private svc = inject(FinanceDataService);

  visible = signal(false);
  amount = signal(0);
  type = signal('');
  description = signal('');
  isError = signal(false);
  message = signal('');
  private _timer: any;

  constructor() {
    effect(() => {
      const tx = this.svc.lastCreated();
      if (!tx) return;
      this.isError.set(false);
      this.amount.set(tx.amount);
      this.type.set(tx.type);
      this.description.set(tx.description);
      this.message.set(`${tx.type === 'Income' ? '+' : '-'}${tx.amount.toFixed(2)} PLN — ${tx.description}`);
      this.show();
    });

    effect(() => {
      const err = this.svc.createError();
      if (!err) return;
      this.isError.set(true);
      this.message.set(err);
      this.show();
    });
  }

  private show() {
    this.visible.set(true);
    clearTimeout(this._timer);
    this._timer = setTimeout(() => this.visible.set(false), 4000);
  }
}
