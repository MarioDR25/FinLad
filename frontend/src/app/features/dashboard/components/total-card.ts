import { Component, input } from '@angular/core';
import { TotalData } from '../../../shared/models/shared.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-total-card',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <div class="px-5 py-8 rounded-xl bg-white border">
      <div class="flex gap-3 ">
        <div class="w-8 h-8 rounded-lg border border-zinc-200 flex items-center justify-center text-[#216d69] p-2">
          <i [class]="'fa-solid ' + data().icon"></i>
        </div>
        <p class="text-lg  text-black ">{{ data().name }}</p>
      </div>
    <p class="text-4xl text-center text-black ">{{ data().balance | currency:'EUR':'symbol':'1.0-0'}}</p>
      
    </div>
  `,
})
export class TotalCard {
  data = input.required<TotalData>();
}
