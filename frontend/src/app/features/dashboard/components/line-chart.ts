import { Component, computed, input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { MonthlyTransactions } from '../../../core/models/shared.model';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH_MAP: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
  enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
  julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
};

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <section class="w-full p-4 md:p-8 rounded-xl border bg-white">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h3 class="text-xl font-semibold text-black">Income vs Expenses</h3>
          <p class="text-sm text-black">Yearly financial performance overview</p>
        </div>
        <div class="flex gap-4">
          <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-[#60a5fa]"></span><span class="text-xs text-black">Income</span></div>
          <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-[#EE2711]"></span><span class="text-xs text-black">Expenses</span></div>
        </div>
      </div>
      <div class="h-50 md:h-75">
        <canvas baseChart [type]="type" [data]="dataLine()" [options]="options" class="w-full h-full"></canvas>
      </div>
    </section>
  `,
})
export class LineChart {
  expenses = input.required<MonthlyTransactions[]>();
  incomes = input.required<MonthlyTransactions[]>();

  type: ChartType = 'line';

  options: ChartConfiguration['options'] = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: '#3c4a42', lineWidth: 0.5 }, ticks: { color: '#bbcabf', font: { size: 10 } } },
      y: { grid: { color: '#3c4a42', lineWidth: 0.5 }, ticks: { color: '#bbcabf', font: { size: 10 } }, beginAtZero: true },
    },
    interaction: { intersect: false, mode: 'index' },
  };

  dataLine = computed<ChartData<'line'>>(() => {
    const mapToArray = (data: MonthlyTransactions[]) => {
      const arr = new Array(12).fill(null);
      data.forEach(m => {
        const idx = MONTH_MAP[m.month.toLowerCase()];
        if (idx !== undefined) arr[idx] = m.amount;
      });
      return arr;
    };

    return {
      labels: MONTHS,
      datasets: [
        { label: 'Income', data: mapToArray(this.incomes()), borderColor: '#60a5fa', backgroundColor: 'rgba(96,165,250,0.1)', fill: true, tension: 0.4, pointBackgroundColor: '#60a5fa', pointRadius: 4, spanGaps: false },
        { label: 'Expenses', data: mapToArray(this.expenses()), borderColor: '#EE2711', backgroundColor: 'rgba(242,80,71,0.09)', fill: true, tension: 0.4, pointBackgroundColor: '#EE2711', pointRadius: 4, spanGaps: false },
      ],
    };
  });
}
