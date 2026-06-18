import { Component, input } from '@angular/core';
import { WalletData } from '../../../core/models/shared.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-wallet-card',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <div class="p-3 rounded-xl bg-white border ">
      <div class="flex justify-between items-start ">
        <div class="w-8 h-8 rounded-lg border border-zinc-100 flex items-center justify-center text-[#216d69]">
          <i [class]="'fa-solid ' + data().icon"></i>
        </div>
        <p class="text-sm  text-black mb-1">{{ data().name }}</p>
        
      </div>
      <div class="flex justify-center">
        <p class="text-2xl font-semibold text-black">{{ data().balance | currency:'EUR':'symbol':'1.0-0'}}</p>
      </div>
    </div>
  `,
})
export class WalletCard {
  data = input.required<WalletData>();
}
