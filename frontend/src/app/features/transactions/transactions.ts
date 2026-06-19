import { Component, OnInit, inject } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { FinanceDataService } from '../../core/services/finance-data.service';
import { YearSelector } from "../../shared/components/year-selector";

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, YearSelector],
  template: `
    <div class="flex-1 max-w-360 mx-auto w-full px-6 md:px-10 py-8 pb-24 md:pb-8 flex flex-col gap-8">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-semibold text-black">Transactions</h2>
        <app-year-selector (year)="this.svc.loadTransactionsByYear($event)"/>
      </div>
      <div class="rounded-lg border border-zinc-200  overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-[#3c4a42] text-xs text-[#216d69] bg-[#f7fdfd] uppercase">
              <th class="p-4 ">Date</th>
              <th class="p-4 ">Description</th>
              <th class="p-4 ">Category</th>
              <th class="p-4 ">Type</th>
              <th class="p-4 ">Wallet</th>
              <th class="p-4  text-center">Amount</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-200">
            @for (tx of svc.transactions(); track tx.id) {
              <tr class="hover:bg-[#f7fdfd] transition-colors text-black">
                <td class="p-4 text-sm ">{{ tx.date | date:'dd-MM-yyyy' }}</td>
                <td class="p-4  capitalize">{{ tx.description }}</td>
                <td class="p-4">{{ tx.category }}</td>
                <td class="p-4 text-sm" [class.text-[#4edea3]]="tx.type === 'Income'" [class.text-[#EE2711]]="tx.type === 'Expense'" [class.text-[#60a5fa]]="tx.type === 'Transfer'">{{ tx.type }}</td>
                <td class="p-4 text-sm ">{{ tx.wallet }}</td>
                <td class="p-4 " >
                  <div class="text-center font-mono border rounded"  [class]="tx.type === 'Expense' ? 'text-[#F25544] ' : 'text-[#33afa7] '">
                    {{ tx.type === 'Income' ? '+' : '-' }}{{ tx.amount | currency:'EUR':'symbol':'1.0-0' }}
                  </div>
                </td>
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

  ngOnInit() {
    this.svc.loadTransactions();
  }

}
