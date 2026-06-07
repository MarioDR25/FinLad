import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <div class="lg:col-span-5 p-8 rounded-xl border border-[#3c4a42] bg-[#161d19] flex flex-col items-center">
      <div class="w-full flex justify-between items-center mb-8">
        <h3 class="text-xl font-semibold text-[#dde4dd]">Expenses by Category</h3>
      </div>
      <div class="w-60 h-60 relative flex items-center justify-center">
        <canvas baseChart [type]="type" [data]="data" [options]="options"></canvas>
        <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span class="text-2xl font-semibold text-[#dde4dd]">1,240</span>
          <span class="text-[10px] text-[#bbcabf] uppercase tracking-widest">Total Spent</span>
        </div>
      </div>
      <div class="w-full mt-10 grid grid-cols-3 gap-4">
        <div class="flex flex-col items-center">
          <div class="flex items-center gap-2 mb-1"><span class="w-2 h-2 rounded-full bg-[#4edea3]"></span><span class="text-xs font-medium text-[#bbcabf]">Food</span></div>
          <span class="text-sm text-[#dde4dd]">45%</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="flex items-center gap-2 mb-1"><span class="w-2 h-2 rounded-full bg-[#adc6ff]"></span><span class="text-xs font-medium text-[#bbcabf]">Utilities</span></div>
          <span class="text-sm text-[#dde4dd]">25%</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="flex items-center gap-2 mb-1"><span class="w-2 h-2 rounded-full bg-[#ffb3af]"></span><span class="text-xs font-medium text-[#bbcabf]">Transport</span></div>
          <span class="text-sm text-[#dde4dd]">15%</span>
        </div>
      </div>
    </div>
  `,
})
export class DoughnutChart {
  type: ChartType = 'doughnut';
  data: ChartData<'doughnut'> = {
    labels: ['Food', 'Utilities', 'Transport', 'Other'],
    datasets: [{ data: [45, 25, 15, 15], backgroundColor: ['#4edea3', '#adc6ff', '#ffb3af', '#2f3632'], borderWidth: 0 }],
  };
  options: any = { responsive: true, maintainAspectRatio: true, cutout: '75%', plugins: { legend: { display: false } } };
}
