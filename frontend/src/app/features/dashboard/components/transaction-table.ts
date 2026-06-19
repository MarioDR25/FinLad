import { Component, input } from '@angular/core';
import { Transaction } from '../../../shared/models/shared.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-transaction-table',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <div class="py-8 px-4 md:px-8 rounded-xl  bg-white">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold text-black">Recent Transactions</h3>
        
      </div>
      
      <div class="border border-zinc-200 rounded-lg overflow-hidden">
        <table class="w-full text-left ">
          <thead>
            <tr class="border-b  text-[#216d69] uppercase  bg-[#f7fdfd] text-xs ">
              <th class="p-2">Description</th>
              <th class="p-2">Category</th>
              <th class="p-2 ">Wallet</th>
              <th class="p-2 text-center">Amount</th>
            </tr>
          </thead>
        
            <tbody class="divide-y divide-zinc-200">
              @for (tx of data().slice(0, 8); track tx.id) {
              <tr class="hover:bg-[#f7fdfd] transition-colors">
                <td class="py-4 px-2"><div class="flex items-center gap-3"><span class="text-base text-black capitalize">{{ tx.description }}</span></div></td>
                <td class="py-4 px-2"><span class="px-2 py-1  text-[10px] rounded uppercase font-bold text-black">{{ tx.category }}</span></td>
                <td class="py-4 px-2 text-sm text-black">{{ tx.wallet }}</td>
                <td class="py-4 px-2 ">
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
export class TransactionTable {
  data = input.required<Transaction[]>();
}
