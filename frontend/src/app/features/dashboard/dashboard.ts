import { Component, computed, inject, OnInit } from '@angular/core';
import { TransactionTable } from './components/transaction-table';
import { FinanceDataService } from '../../core/services/finance-data.service';
import { WalletCard } from './components/wallet-card';
import { LineChart } from './components/line-chart';
import { DoughnutChart } from './components/doughnut-chart';
import { AiInput } from './components/ai-input';
import { TransactionToast } from './components/toast';
import { BankCardComponent } from "./components/bank-card";
import { CurrencyPipe } from '@angular/common';
import { TotalData } from '../../core/models/shared.model';
import { TotalCard } from "./components/total-card";

@Component({
  selector: 'app-home',
  imports: [TransactionTable, WalletCard, LineChart, DoughnutChart, AiInput, TransactionToast, BankCardComponent, CurrencyPipe, TotalCard],
  template: ` 
  <main class="grid grid-cols-1 lg:grid-cols-12 gap-4  max-w-360 mx-auto w-full px-6 md:px-10 ">

    <section class=" lg:col-span-6 flex flex-col gap-3">
      
      <div class="flex ">
        <div class="border w-full">
          <div class="flex gap-4 items-center ">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wallet-icon lucide-wallet"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>
            <h2 class="text-xs  font-bold  uppercase tracking-widest  text-[#216d69]">
              Total Balance
            </h2>
          </div>
          <div class="text-5xl  text-black flex items-center">
            
            <span >{{totalBalance() | currency:'EUR':'symbol':'1.0-0'}}</span>
          </div>
          
        </div>     
        <app-bank-card/>
      </div>

      <app-ai-input />
      <app-transaction-table class="lg:col-span-6" [data]="svc.transactions()" />  
      
    </section>


    <section class="lg:col-span-6 flex flex-col gap-2">
      <div class="grid grid-cols-2  gap-2 md:gap-2 ">
        @for (total of dataTotal; track total.id) {
          <app-total-card [data]="total" />
        }
      
      </div>
    
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-2">
        @for (wallet of svc.wallets(); track wallet.id) {
          <app-wallet-card [data]="wallet" />
        }
      </div>
      <app-line-chart [incomes]="svc.monthlyIncome()" [expenses]="svc.monthlyExpenses()" />
      <app-doughnut-chart  [data]="svc.expensesCategory()"/>
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


  dataTotal : TotalData[] = [ {id: 'totalIncome', name: 'Total Income', icon: 'fa-money-bill-trend-up fa-rotate-180', balance: 12547 },
    {id: 'totalExpenses', name: 'Total Expenses', icon: 'fa-money-bill-trend-up', balance: 98531 }
  ]


}
