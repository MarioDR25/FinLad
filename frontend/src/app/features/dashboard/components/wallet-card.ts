import { Component, input } from '@angular/core';
import { WalletData } from '../../../core/models/shared.model';

@Component({
  selector: 'app-wallet-card',
  standalone: true,
  template: `
    <div class="p-6 rounded-xl  bg-white ">
      <div class="flex justify-between items-start mb-6">
      <div class="w-10 h-10 rounded-lg bg-[#2f3632] flex items-center justify-center text-[#4edea3]">
        <i [class]="'fa-solid ' + data().icon"></i>
      </div>
        <span class="text-[10px] font-bold text-black group-hover:text-[#4edea3]/60 transition-colors">{{ data().tag }}</span>
      </div>
      <p class="text-sm font-medium text-black mb-1">{{ data().name }}</p>
      <p class="text-xl font-semibold text-black">{{ data().balance }} PLN</p>
    </div>
  `,
})
export class WalletCard {
  data = input.required<WalletData>();
  
  
}
