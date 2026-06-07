import { Component, input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <section class="w-full p-8 rounded-xl border border-[#3c4a42] bg-[#161d19]">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h3 class="text-xl font-semibold text-[#dde4dd]">Income vs Expenses</h3>
          <p class="text-sm text-[#bbcabf]">Yearly financial performance overview</p>
        </div>
        <div class="flex gap-4">
          <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-[#adc6ff]"></span><span class="text-xs text-[#bbcabf]">Income</span></div>
          <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-[#ffb4ab]"></span><span class="text-xs text-[#bbcabf]">Expenses</span></div>
        </div>
      </div>
      <div class="h-75">
        <canvas baseChart [type]="type" [data]="data()" [options]="options" class="w-full h-full"></canvas>
      </div>
    </section>
  `,
})
export class LineChart {
  type: ChartType = 'line';
  data = input<ChartData<'line'>>(); 

  options: ChartConfiguration['options'] = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: '#3c4a42', lineWidth: 0.5 }, ticks: { color: '#bbcabf', font: { size: 10 } } },
      y: { grid: { color: '#3c4a42', lineWidth: 0.5 }, ticks: { color: '#bbcabf', font: { size: 10 } }, beginAtZero: false },
    },
    interaction: { intersect: false, mode: 'index' },
  };
}
