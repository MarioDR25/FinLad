import { Component, computed, inject, input, signal } from '@angular/core';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-bank-card',
  standalone: true,
  template: `
    <div class="relative w-64 sm:w-64 lg:w-72 xl:w-80 card-break:w-90 aspect-310/160 max-w-full shadow-lg select-none rounded-xl bg-[#34c1b4]">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 160" class="absolute inset-0 block w-full h-full">
        <defs>
          <clipPath id="card-radius">
            <rect width="310" height="160" rx="8" ry="8" />
          </clipPath>
        </defs>
        <g clip-path="url(#card-radius)">
          <rect width="320" height="180" fill="#216d69" />
          <path d="M 20,180 L 320,180 L 320,-80 Z" fill="#26716d"/>
          <path d="M 80,180 L 320,180 L 320,-20 Z" fill="#307773" filter="drop-shadow(-3px -3px 4px rgba(0,0,0,0.15))"/>
          <path d="M 140,180 L 320,180 L 320,40 Z" fill="#41827e" filter="drop-shadow(-3px -3px 4px rgba(0,0,0,0.15))"/>
        </g>
      </svg>
      <div class="relative z-10 w-full h-full p-5 flex flex-col justify-between text-white font-sans">
        <div class="flex justify-between items-center">
          <div class="flex gap-2 items-center">
            <i class="fa-solid fa-chart-simple text-white text-xl"></i>
            <span class="text-lg font-bold tracking-widest uppercase">FinŁad</span>
          </div>
          <button (click)="toggle()" class="text-white/50 hover:text-white text-sm cursor-pointer">
            <i [class]="visible() ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
          </button>
        </div>
        <div class="flex justify-between items-center gap-2">
          <span class="text-xs font-light text-zinc-300 tracking-wider uppercase">{{ visible() ? cardNumber() : '•••• •••• •••• ••••' }}</span>
          <div class="text-right">
            <span class="text-[10px] font-light text-zinc-300 block">CVV</span>
            <span class="text-sm font-medium">{{ visible() ? cvv() : '•••' }}</span>
          </div>
        </div>
        <div class="flex justify-between items-end">
          <span class="text-xs font-medium tracking-widest uppercase">{{ userName() }}</span>
          <div class="text-center">
            <span class="text-[10px] font-light text-zinc-300 block">EXP</span>
            <span class="text-xs font-medium">{{ expire() || 'MM/YY' }}</span>
          </div>
          <span class="text-[10px] font-medium tracking-widest text-white/60">VISA</span>
        </div>
      </div>
    </div>
  `,
})
export class BankCardComponent {
  private storage = inject(StorageService);

  cardNumber = input('');
  cvv = input('');
  expire = input('');
  userName = computed(() => this.storage.get('user') ?? '');
  visible = signal(false);

  toggle() {
    this.visible.update(v => !v);
  }
}

