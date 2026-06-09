import { inject, Injectable, Signal, signal } from '@angular/core';
import { ExpensesCategory, Transaction, WalletData } from '../../../shared/shared.model';
import { ChartData  } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);

  wallets = signal<WalletData[]>([]);
  transactions = signal<Transaction[]>([]);
  expensesCategory = signal<ExpensesCategory[]>([]);


  dataLine: ChartData<'line'> = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        { data: [2200, 2100, 2500, 2800, 3000, 3000, 3100, 3000, 3300, 3700, 3000, 2900], label: 'Income', borderColor: '#adc6ff', backgroundColor: 'rgba(173,198,255,0.1)', fill: true, tension: 0.4, pointBackgroundColor: '#adc6ff', pointRadius: 4 },
        { data: [2000, 1900, 2000, 2100, 2300, 2200, 2400, 2500, 2300, 2600, 2400, 2500], label: 'Expenses', borderColor: '#ffb4ab', backgroundColor: 'rgba(255,180,171,0.1)', fill: true, tension: 0.4, pointBackgroundColor: '#ffb4ab', pointRadius: 4 },
      ],
  }; 

   
  loadWallets (): Observable<WalletData[]> { 
    return this.http.get<WalletData[]>(`${environment.apiUrl}/Wallet`) 
  } 

  loadTransactions(){
    return this.http.get<Transaction[]>(`${environment.apiUrl}/Transaction`) 
  }

  loadExpensesByCategory(){
    return this.http.get<ExpensesCategory[]>(`${environment.apiUrl}/Transaction/by-category`) 
  }
  
  createTransaction(input: string): Observable<Transaction> {
    return this.http.post<Transaction>(`${environment.apiUrl}/Transaction/ai`, { dataInput: input }).pipe(
      tap((a) => console.log(a, '<- :debo llegar aqui'))
    )
  } 






}


