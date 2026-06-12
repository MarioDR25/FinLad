import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FinanceDataService } from '../../core/services/finance-data.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="flex-1 max-w-360 mx-auto w-full px-6 md:px-10 py-8 pb-24 md:pb-8 flex flex-col gap-8">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-semibold text-[#dde4dd]">Transactions</h2>
        <select #yearSelect (change)="onYearChange(yearSelect.value)" class="bg-[#1a211d] border border-[#3c4a42] rounded-lg px-4 py-2 text-[#dde4dd] text-sm">
          @for (y of years; track y) {
            <option [value]="y" [selected]="y === currentYear">{{ y }}</option>
          }
        </select>
      </div>
      <div class="rounded-xl border border-[#3c4a42] bg-[#161d19] overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-[#3c4a42]">
              <th class="p-4 text-xs text-[#bbcabf]/60 uppercase">Date</th>
              <th class="p-4 text-xs text-[#bbcabf]/60 uppercase">Description</th>
              <th class="p-4 text-xs text-[#bbcabf]/60 uppercase">Category</th>
              <th class="p-4 text-xs text-[#bbcabf]/60 uppercase">Type</th>
              <th class="p-4 text-xs text-[#bbcabf]/60 uppercase">Wallet</th>
              <th class="p-4 text-xs text-[#bbcabf]/60 uppercase text-right">Amount</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#3c4a42]/30">
            @for (tx of svc.transactions(); track tx.id) {
              <tr class="hover:bg-[#2f3632]/20 transition-colors">
                <td class="p-4 text-sm text-[#bbcabf]">{{ tx.date | date:'dd-MM-yyyy' }}</td>
                <td class="p-4 text-base text-[#dde4dd]">{{ tx.description }}</td>
                <td class="p-4"><span class="px-2 py-1 bg-[#2f3632] text-[10px] rounded uppercase font-bold text-[#bbcabf]">{{ tx.category }}</span></td>
                <td class="p-4 text-sm" [class.text-[#4edea3]]="tx.type === 'Income'" [class.text-[#EE2711]]="tx.type === 'Expense'" [class.text-[#60a5fa]]="tx.type === 'Transfer'">{{ tx.type }}</td>
                <td class="p-4 text-sm text-[#bbcabf]">{{ tx.wallet }}</td>
                <td class="p-4 text-right font-mono text-sm" [class.text-[#4edea3]]="tx.type === 'Income'" [class.text-[#EE2711]]="tx.type !== 'Income'">{{ tx.type === 'Income' ? '+' : '-' }}{{ tx.amount.toFixed(2) }} PLN</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class TransactionsPage implements OnInit {
  readonly svc = inject(FinanceDataService);

  currentYear = new Date().getFullYear();
  years = Array.from({ length: 3 }, (_, i) => this.currentYear - i);

  ngOnInit() {
    this.svc.loadTransactions();
  }

  onYearChange(year: string) {
    this.svc.loadTransactionsByYear(+year);
  }
}
