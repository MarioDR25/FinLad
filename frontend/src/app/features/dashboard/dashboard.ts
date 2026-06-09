import { Component, computed, inject } from '@angular/core';
import { TransactionTable } from './components/transaction-table';
import { DashboardService } from './services/dashboard.service';
import { WalletCard } from './components/wallet-card';
import { LineChart } from './components/line-chart';
import { DoughnutChart } from './components/doughnut-chart';
import { AiInput } from './components/ai-input';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  DoughnutController,
  ArcElement,
  Legend,
  Tooltip,
  Filler,
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  DoughnutController,
  ArcElement,
  Legend,
  Tooltip,
  Filler,
);

@Component({
  selector: 'app-home',
  imports: [TransactionTable, WalletCard, LineChart, DoughnutChart, AiInput],
  template: ` <main class="flex-1 max-w-360 mx-auto w-full px-6 md:px-10 py-8 flex flex-col gap-10">
    <section class="mt-2">
      <h2 class="text-xs font-medium text-[#bbcabf] uppercase tracking-widest mb-2 opacity-70">
        Total Balance
      </h2>
      <div class="flex items-baseline gap-3">
        <span class="text-5xl font-bold text-[#dde4dd]">{{totalBalance()}}</span>
        <span class="text-2xl font-semibold text-[#4edea3]/80">PLN</span>
      </div>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-4 gap-6">
      @for (wallet of walletsList(); track wallet.id) {
        <app-wallet-card [data]="wallet" />
      }
    </section>

    <app-ai-input />
    
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-8 ">
      <app-doughnut-chart class="lg:col-span-5" [data]="expensesCategory()"/>
      <app-transaction-table class="lg:col-span-7" [data]="transactionsList()" />
    </section>
    
    <app-line-chart [data]="dashboardService.dataLine" />

  </main>`,
})
export class Dashboard {
  dashboardService = inject(DashboardService);
  walletsList = this.dashboardService.wallets;
  transactionsList = this.dashboardService.transactions;
  expensesCategory = this.dashboardService.expensesCategory;
  
  totalBalance = computed(() =>  this.walletsList().reduce((acc, wallet) => acc + wallet.balance, 0));

  ngOnInit() {
     this.onLoadWallets();
     this.onLoadTransactions();
     this.onloadExpensesByCategory();
  }


  onLoadWallets(){
    this.dashboardService.loadWallets().subscribe(
      {
        next:(res) => this.dashboardService.wallets.set(res),
        error: (err) => console.error('Failed to load wallets', err) 
      }
    );
  }

  onloadExpensesByCategory(){
    this.dashboardService.loadExpensesByCategory().subscribe(
      {
        next:(res) => this.dashboardService.expensesCategory.set(res),
        error: (err) => console.error('Failed to load Expenses', err) 
      }
    );
  }



  onLoadTransactions(){
    this.dashboardService.loadTransactions().subscribe(
      {
        next:(res) => this.dashboardService.transactions.set(res),
        error: (err) => console.error('Failed to load transactions', err) 
      }
    );
  }
}
