import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionTable } from './components/transaction-table';
import { FinanceDataService } from '../../core/services/finance-data.service';
import { WalletCard } from '../../shared/components/wallet-card';
import { LineChart } from '../../shared/components/line-chart';
import { DoughnutChart } from '../../shared/components/doughnut-chart';
import { AiInput } from './components/ai-input';
import { TransactionToast } from './components/toast';
import { BankCardComponent } from "./components/bank-card";
import { CurrencyPipe } from '@angular/common';
import { TotalData } from '../../shared/models/shared.model';
import { TotalCard } from "./components/total-card";

@Component({
  selector: 'app-home',
  imports: [TransactionTable, WalletCard, LineChart, DoughnutChart, AiInput, TransactionToast, BankCardComponent, CurrencyPipe, TotalCard, FormsModule],
  template: ` 
  <main class="grid grid-cols-1 lg:grid-cols-12 gap-4 max-w-360 mx-auto w-full px-4 md:px-10 pb-24 md:pb-8">

    <section class="lg:col-span-6 flex flex-col gap-4">
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex flex-col gap-4 text-center md:text-left items-center md:items-start">
          <div>
            <div class="flex gap-4 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wallet-icon lucide-wallet"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>
              <h2 class="text-xs font-bold uppercase tracking-widest text-[#216d69]">Total Balance</h2>
            </div>
            <div class="text-5xl text-black">{{totalBalance() | currency:'EUR':'symbol':'1.0-0'}}</div>
          </div>
          <div class="flex flex-col gap-2 items-center">
            <input [(ngModel)]="cardInput" placeholder="CARD NUMBER" class="w-full max-w-56 bg-zinc-100 rounded px-2 py-1.5 text-xs text-black border border-zinc-200 text-center" />
            <div class="flex gap-2">
              <input [(ngModel)]="cvvInput" placeholder="CVV" maxlength="4" class="w-14 bg-zinc-100 rounded px-2 py-1.5 text-xs text-black border border-zinc-200" />
              <input [(ngModel)]="expireInput" placeholder="MM/YY" maxlength="5" class="w-14 bg-zinc-100 rounded px-2 py-1.5 text-xs text-black border border-zinc-200" />
              <button (click)="saveCard()" class="px-4 py-1 bg-[#216d69] text-white text-xs rounded hover:bg-[#2b8c87]">Save</button>
            </div>
          </div>
        </div>
        <div class="flex justify-center md:justify-end">
          <app-bank-card [cardNumber]="cardNumber()" [cvv]="cvv()" [expire]="expire()"/>
        </div>
      </div>

      <app-ai-input />
      <app-transaction-table class="lg:col-span-6" [data]="svc.transactions()" />  
    </section>


    <section class="lg:col-span-6 flex flex-col gap-2">
      <div class="grid grid-cols-2  gap-2 md:gap-2 ">
        @for (total of dataTotal(); track total.id) {
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
  readonly dataTotal = this.svc.totalData;

  cardNumber = signal('');
  cvv = signal('');
  cardInput = signal('');
  cvvInput = signal('');
  expireInput = signal('');
  expire = signal('');

  saveCard() {
    this.cardNumber.set(this.cardInput());
    this.cvv.set(this.cvvInput());
    this.expire.set(this.expireInput());
    this.cardInput.set('');
    this.cvvInput.set('');
    this.expireInput.set('');
  }
  
  readonly totalBalance = computed(() =>  
    this.svc.wallets().reduce((acc, wallet) => acc + wallet.balance, 0));

  ngOnInit() {
    this.svc.loadTransactions();
    this.svc.loadAll();
  }



}
