import { Component, OnInit, inject } from '@angular/core';
import { FinanceDataService } from '../../core/services/finance-data.service';
import { DoughnutChart } from '../dashboard/components/doughnut-chart';
import { LineChart } from '../dashboard/components/line-chart';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [DoughnutChart, LineChart],
  template: `
    <div class="flex-1 max-w-360 mx-auto w-full px-6 md:px-10 py-8 pb-24 md:pb-8 flex flex-col gap-5">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-semibold text-black">Analytics</h2>
        <select #yearSelect (change)="onYearChange(yearSelect.value)" class="bg-[#216d69] rounded-lg px-4 py-1 text-[#dde4dd]  text-lg">
          @for (y of years; track y) {
            <option [value]="y" [selected]="y === currentYear">{{ y }}</option>
          }
        </select>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <app-doughnut-chart class="lg:col-span-5" [data]="svc.expensesCategory()" />
        <app-line-chart class="lg:col-span-7" [incomes]="svc.monthlyIncome()" [expenses]="svc.monthlyExpenses()" />
      </div>
    </div>
  `,
})
export class AnalyticsPage implements OnInit {
  readonly svc = inject(FinanceDataService);

  currentYear = new Date().getFullYear();
  years = Array.from({ length: 5 }, (_, i) => this.currentYear - i);

  ngOnInit() {
    this.svc.loadAll();
  }

  onYearChange(year: string) {
    this.svc.loadMonthlyByYear(+year);
  }
}
