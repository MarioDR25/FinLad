import { Component, OnInit, inject } from '@angular/core';
import { FinanceDataService } from '../../core/services/finance-data.service';
import { DoughnutChart } from '../../shared/components/doughnut-chart';
import { LineChart } from '../../shared/components/line-chart';
import { YearSelector } from "../../shared/components/year-selector";

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [DoughnutChart, LineChart, YearSelector],
  template: `
    <div class="flex-1 max-w-360 mx-auto w-full px-6 md:px-10 py-8 pb-24 md:pb-8 flex flex-col gap-5">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-semibold text-black">Analytics</h2>
        <app-year-selector (year)="this.svc.loadMonthlyByYear($event)"/>
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
  
  ngOnInit() {
    this.svc.loadAll();
    this.svc.loadMonthlyByYear(this.currentYear);
  }

  currentYear = new Date().getFullYear();
 
}
