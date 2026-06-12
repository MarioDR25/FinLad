import { Component, effect, inject, signal } from '@angular/core';
import { FinanceDataService } from '../../../core/services/finance-data.service';

@Component({
  selector: 'app-transaction-toast',
  standalone: true,
  template: `
    @if (visible()) {
      <div class="fixed top-5 right-10 flex px-8 py-4   transition-all">
        <i class="fa-solid fa-circle-check text-4xl self-center" [class.text-green-400]="type() === 'Income'" [class.text-red-400]="type() === 'Expense'" [class.text-blue-400]="type() === 'Transfer'"></i>
        <div class="bg-white rounded text-lg text-black px-8 py-3">
          {{ type() === 'Income' ? '+' : '-' }}{{ amount() }} PLN — {{ description() }}
        </div>
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
  private _timer: any;

  constructor() {
    effect(() => {
      const tx = this.svc.lastCreated();
      if (!tx) return;
      this.amount.set(tx.amount);
      this.type.set(tx.type);
      this.description.set(tx.description);
      this.visible.set(true);
      clearTimeout(this._timer);
      this._timer = setTimeout(() => this.visible.set(false), 4000);
    });
  }
}

