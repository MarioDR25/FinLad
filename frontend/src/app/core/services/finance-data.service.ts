import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ExpensesCategory, MonthlyTransactions, TotalData, Transaction, WalletData } from '../../shared/models/shared.model';

@Injectable({ providedIn: 'root' })
export class FinanceDataService {
  private http = inject(HttpClient);
  private hubConnection!: signalR.HubConnection;

  apiUrl = environment.apiUrl;
  urlTransaction = `${this.apiUrl}/Transaction`;

  readonly wallets = signal<WalletData[]>([]);
  readonly transactions = signal<Transaction[]>([]);
  readonly expensesCategory = signal<ExpensesCategory[]>([]);
  readonly monthlyExpenses = signal<MonthlyTransactions[]>([]);
  readonly monthlyIncome = signal<MonthlyTransactions[]>([]);
  readonly totalData = signal<TotalData[]>([]);

  readonly lastCreated = signal<Transaction | null>(null);
  readonly createError = signal<string | null>(null);
  readonly createLoading = signal(false);


  constructor() {
    this.startConnection();
  }


  loadTransactions() {
    this.http.get<Transaction[]>(this.urlTransaction)
      .subscribe({
        next: (data) => { this.transactions.set(data)},
        error: (err) => { console.error("Failed to load transactions", err)}
      });
  }

  loadAll() {
    this.http.get<WalletData[]>(`${this.apiUrl}/Wallet`)
      .subscribe({
        next: (data) => { this.wallets.set(data)},
        error: (err) => { console.error("Failed to load wallets", err)}
      });

    this.loadExpensesByCategory();

    this.http.get<MonthlyTransactions[]>(`${this.urlTransaction}/monthly?type=Expense`)
      .subscribe({
        next: (data) => { this.monthlyExpenses.set(data)},
        error: (err) => { console.error("Failed to load Expenses", err)}
      });

    this.http.get<MonthlyTransactions[]>(`${this.urlTransaction}/monthly?type=Income`)
      .subscribe({
        next: (data) => { this.monthlyIncome.set(data)},
        error: (err) => { console.error("Failed to load Income", err)}
      });

    this.http.get<TotalData[]>(`${this.urlTransaction}/totals`)
      .subscribe({
        next: (data) => this.totalData.set(data),
        error: (err) => console.error("Failed to load totals", err)
      });
  }



  createTransaction(input: string): void {
    this.createLoading.set(true);
    this.createError.set(null);
    this.lastCreated.set(null);

    this.http.post<Transaction>(`${this.urlTransaction}/ai`, { dataInput: input })
      .subscribe({
        next: (res) => {
          
          this.lastCreated.set(res);
          this.createLoading.set(false);
        },
        error: (err) => {
          this.createError.set(err.error?.error || 'Something went wrong');
          this.createLoading.set(false);
        }
      });
  }


  loadMonthlyByYear(year: number) {
    this.http.get<MonthlyTransactions[]>(`${this.urlTransaction}/monthly?type=Expense&year=${year}`)
      .subscribe({ next: (d) => this.monthlyExpenses.set(d) });
    this.http.get<MonthlyTransactions[]>(`${this.urlTransaction}/monthly?type=Income&year=${year}`)
      .subscribe({ next: (d) => this.monthlyIncome.set(d) });
    this.loadExpensesByCategory(year);
  }

  loadExpensesByCategory(year?: number) {
    const url = year ? `${this.apiUrl}/Category/expenses?year=${year}` : `${this.apiUrl}/Category/expenses`;
    this.http.get<ExpensesCategory[]>(url)
      .subscribe({
        next: (data) => { this.expensesCategory.set(data)},
        error: (err) => { console.error("Failed to load Expenses by category", err)}
      });
  }

  
  
  loadTransactionsByYear(year: number) {
    this.http.get<Transaction[]>(`${this.urlTransaction}?year=${year}`)
      .subscribe({ next: (d) => this.transactions.set(d) });
  }

  private startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/hubs/transactions')
      .withAutomaticReconnect()
      .build();

    
    this.hubConnection.on('TransactionCreated', (newTransaction: Transaction) => {
      
      this.transactions.update(list => {
        if (list.some(t => t.id === newTransaction.id)) return list;
        return [newTransaction, ...list];
      });

      this.loadAll();
    });

    this.hubConnection.onreconnected(() => {
      console.log('Reconnected, reloading data...');
      this.loadAll();
    });

    this.hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.error('Error connecting', err));
  }


  disconnect() {
  this.hubConnection.stop()
    .then(() => console.log('Closed connection'))
    .catch(err => console.error('Error closing connection', err));
  }

}
