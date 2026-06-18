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
    <div class="p-4 md:p-4 rounded-xl  bg-white flex flex-col items-center gap-8 border">
      <div class="w-full flex justify-between items-center ">
        <h3 class="text-lg font-semibold text-black">Expenses by Category</h3>
      </div>

      <div class="flex gap-5 ">
        <div class="w-35 h-35 md:w-45 md:h-45 relative flex items-center justify-center">
          <canvas baseChart [type]="type" [data]="chartData()" [options]="options"></canvas>
          <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span class="text-2xl font-semibold text-[#216d69]">{{ totalSpent() }}</span>
            <span class="text-[10px] text-[#216d69] uppercase tracking-widest">Total Spent</span>
          </div>
        </div>
        
        <div class="w-full  grid grid-cols-3 gap-2">
          @for (item of data(); track item.category) {
            <div class="flex flex-col items-center">
                <div class="flex items-center gap-2 mb-1">
                  <span class="w-2 h-2 rounded-full" [style.background]="getColor($index)"></span>
                <span class="text-xs font-medium text-black">{{ item.category }}</span>
              </div>
              <span class="text-sm text-black">{{ item.percentage }}%</span>
            </div>
          }
        </div>
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
