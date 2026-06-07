import { inject, Injectable, signal } from '@angular/core';
import { Transaction, WalletData } from '../../../shared/shared.model';
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

  transactions: Transaction[] = [
    { id: 1, icon: '🍽️', description: 'Green Garden Bistro', category: 'Food', wallet: 'Bank', amount: -45.00 },
    { id: 2, icon: '💼', description: 'Salary Deposit', category: 'Income', wallet: 'Bank', amount: 3000.00 },
    { id: 3, icon: '🚗', description: 'Uber Ride', category: 'Transport', wallet: 'Cash', amount: -28.50 },
    { id: 4, icon: '⚡', description: 'Energy Bill', category: 'Utilities', wallet: 'Savings', amount: -210.00 },
  ];


  dataLine: ChartData<'line'> = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        { data: [2200, 2100, 2000, 2800, 3200, 3000, 3100, 3500, 3300, 3700, 3600, 3700], label: 'Income', borderColor: '#adc6ff', backgroundColor: 'rgba(173,198,255,0.1)', fill: true, tension: 0.4, pointBackgroundColor: '#adc6ff', pointRadius: 4 },
        { data: [1800, 1900, 2000, 2100, 2300, 2200, 2400, 2500, 2300, 2600, 2400, 2500], label: 'Expenses', borderColor: '#ffb4ab', backgroundColor: 'rgba(255,180,171,0.1)', fill: true, tension: 0.4, pointBackgroundColor: '#ffb4ab', pointRadius: 4 },
      ],
  }; 

   
  getWallets(){
     this.http.get<WalletData[]>(`${environment.apiUrl}/Wallets`).subscribe(
      {
        next:(res) => this.wallets.set(res),
        error: (err) => console.error('Failed to load wallets', err) 
      }
    )
  } 
}


