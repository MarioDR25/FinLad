import { Component, computed, input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType } from 'chart.js';
import { ExpensesCategory } from '../../../core/models/shared.model';

const COLORS = ['#4edea3', '#adc6ff', '#ffb3af', '#fbbf24', '#a78bfa', '#34d399', '#f472b6', '#60a5fa', '#fb923c', '#94a3b8'];

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <div class="p-4 md:p-8 rounded-xl border border-[#3c4a42] bg-[#161d19] flex flex-col items-center">
      <div class="w-full flex justify-between items-center mb-8">
        <h3 class="text-xl font-semibold text-[#dde4dd]">Expenses by Category</h3>
      </div>
      <div class="w-48 h-48 md:w-60 md:h-60 relative flex items-center justify-center">
        <canvas baseChart [type]="type" [data]="chartData()" [options]="options"></canvas>
        <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span class="text-2xl font-semibold text-[#dde4dd]">{{ totalSpent() }}</span>
          <span class="text-[10px] text-[#bbcabf] uppercase tracking-widest">Total Spent</span>
        </div>
      </div>
      <div class="w-full mt-8 grid grid-cols-3 gap-4">
        @for (item of data(); track item.category) {
          <div class="flex flex-col items-center">
              <div class="flex items-center gap-2 mb-1">
                <span class="w-2 h-2 rounded-full" [style.background]="getColor($index)"></span>
              <span class="text-xs font-medium text-[#bbcabf]">{{ item.category }}</span>
            </div>
            <span class="text-sm text-[#dde4dd]">{{ item.percentage }}%</span>
          </div>
        }
      </div>
    </div>
  `,
})
export class DoughnutChart {
  data = input.required<ExpensesCategory[]>();

  type: ChartType = 'doughnut';
  options: any = { responsive: true, maintainAspectRatio: true, cutout: '75%', plugins: { legend: { display: false } } };

  chartData = computed<ChartData<'doughnut'>>(() => ({
    labels: this.data().map(d => d.category),
    datasets: [{
      data: this.data().map(d => d.percentage),
      backgroundColor: this.data().map((_, i) => COLORS[i % COLORS.length]),
      borderWidth: 0,
    }],
  }));

  totalSpent = computed(() => this.data().reduce((sum, d) => sum + d.total, 0));

  getColor(index: number): string {
    return COLORS[index % COLORS.length];
  }
}
