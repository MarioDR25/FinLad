import { Component, input } from '@angular/core';
import { Transaction } from '../../../shared/shared.model';

@Component({
  selector: 'app-transaction-table',
  standalone: true,
  template: `
    <div class="py-2 px-8 rounded-xl border border-[#3c4a42] bg-[#161d19]">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-semibold text-[#dde4dd]">Recent Transactions</h3>
        
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-[#3c4a42]">
              <th class="pb-4 text-xs text-[#bbcabf]/60 uppercase tracking-tighter">Description</th>
              <th class="pb-4 text-xs text-[#bbcabf]/60 uppercase tracking-tighter">Category</th>
              <th class="pb-4 text-xs text-[#bbcabf]/60 uppercase tracking-tighter">Wallet</th>
              <th class="pb-4 text-xs text-[#bbcabf]/60 uppercase tracking-tighter text-right">Amount</th>
            </tr>
          </thead>
            <tbody class="divide-y divide-[#3c4a42]/30">
              @for (tx of data().slice(0, 6); track tx.id) {
              <tr class="hover:bg-[#2f3632]/20 transition-colors">
                <td class="py-4"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded bg-[#242c27] flex items-center justify-center text-[#4edea3] text-base"> icon </div><span class="text-base text-[#dde4dd]">{{ tx.description }}</span></div></td>
                <td class="py-4"><span class="px-2 py-1 bg-[#2f3632] text-[10px] rounded uppercase font-bold text-[#bbcabf]">{{ tx.category }}</span></td>
                <td class="py-4 text-sm text-[#bbcabf]">{{ tx.wallet }}</td>
                <td class="py-4 text-right font-mono" [class.text-[#F25544]]="tx.type === 'Expense'" [class.text-[#4edea3]]="tx.amount > 0">{{ tx.type === 'Income' ? '+' : '-' }}{{ tx.amount.toFixed(2) }}</td>
              </tr>
            }
            <tr>
              <td colspan="4" class="text-center py-5">
                <button class="text-lg font-medium text-[#4edea3] hover:underline cursor-pointer">View All</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class TransactionTable {
  data = input.required<Transaction[]>();
}
