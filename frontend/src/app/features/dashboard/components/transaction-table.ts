import { Component, input } from '@angular/core';
import { Transaction } from '../../../core/models/shared.model';

@Component({
  selector: 'app-transaction-table',
  standalone: true,
  template: `
    <div class="py-8 px-4 md:px-8 rounded-xl  bg-white">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-semibold text-black">Recent Transactions</h3>
        
      </div>
      <div class="overflow-x-auto ">
        <table class="w-full text-left  ">
          <thead>
            <tr class="border-b border-[#3c4a42] bg-[#f7fdfd]">
              <th class="pb-4 text-xs text-[#216d69]  uppercase tracking-tighter">Description</th>
              <th class="pb-4 text-xs text-[#216d69]  uppercase tracking-tighter">Category</th>
              <th class="pb-4 text-xs text-[#216d69]  uppercase tracking-tighter">Wallet</th>
              <th class="pb-4 text-xs text-[#216d69]  uppercase tracking-tighter text-right">Amount</th>
            </tr>
          </thead>
            <tbody class="divide-y divide-[#3c4a42]/30">
              @for (tx of data().slice(0, 7); track tx.id) {
              <tr class="hover:bg-[#2f3632]/20 transition-colors">
                <td class="py-4"><div class="flex items-center gap-3"><span class="text-base text-black">{{ tx.description }}</span></div></td>
                <td class="py-4"><span class="px-2 py-1  text-[10px] rounded uppercase font-bold text-black">{{ tx.category }}</span></td>
                <td class="py-4 text-sm text-black">{{ tx.wallet }}</td>
                <td class="py-4 text-right font-mono" [class.text-[#F25544]]="tx.type === 'Expense'" [class.text-[#4edea3]]="tx.amount > 0">{{ tx.type === 'Income' ? '+' : '-' }}{{ tx.amount.toFixed(2) }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class TransactionTable {
  data = input.required<Transaction[]>();
}
