import { Component, computed, inject, OnInit } from '@angular/core';
import { TransactionTable } from './components/transaction-table';
import { FinanceDataService } from '../../core/services/finance-data.service';
import { WalletCard } from './components/wallet-card';
import { LineChart } from './components/line-chart';
import { DoughnutChart } from './components/doughnut-chart';
import { AiInput } from './components/ai-input';
import { TransactionToast } from './components/toast';
import { BankCardComponent } from "./components/bank-card";

@Component({
  selector: 'app-home',
  imports: [TransactionTable, WalletCard, LineChart, DoughnutChart, AiInput, TransactionToast, BankCardComponent],
  template: ` <main class="flex-1 max-w-360 mx-auto w-full px-6 md:px-10 py-8 pb-24 md:pb-8 flex flex-col gap-4 bg-[#fafafa] rounded-4xl">

    
    <section class=" grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div class="lg:col-span-6 text-black flex flex-col gap-2">
        <div class="flex justify-between">
          <div class="">
            <div class="flex gap-4 items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wallet-icon lucide-wallet"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>
              <h2 class="text-xs  font-bold text-black uppercase tracking-widest  opacity-70">
                Total Balance
              </h2>
            </div>
            <div class="text-5xl  text-black flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-euro-icon lucide-euro"><path d="M4 10h12"/><path d="M4 14h9"/><path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"/></svg>
              <span >{{totalBalance()}}</span>
            </div>
          </div>
          
          
            <app-bank-card/>
          
        </div>
        <app-ai-input />
      </div>
      
      <div class="lg:col-span-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4">
          @for (wallet of svc.wallets(); track wallet.id) {
            <app-wallet-card [data]="wallet" />
          }
        </div>
      </div>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
      <app-transaction-table class="lg:col-span-6" [data]="svc.transactions()" />

      <div class="grid grid-cols-1 lg:col-span-6 gap-4">
        <app-line-chart [incomes]="svc.monthlyIncome()" [expenses]="svc.monthlyExpenses()" />
        <app-doughnut-chart  [data]="svc.expensesCategory()"/>
      </div>
    </section>
    

  </main>
  <app-transaction-toast />
`,
})
export class Dashboard implements OnInit {
  readonly svc = inject(FinanceDataService);
  
  readonly totalBalance = computed(() =>  
    this.svc.wallets().reduce((acc, wallet) => acc + wallet.balance, 0));

  ngOnInit() {
    this.svc.loadTransactions();
    this.svc.loadAll();
  }
}
