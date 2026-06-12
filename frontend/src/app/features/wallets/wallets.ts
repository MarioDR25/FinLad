import { Component, OnInit, inject } from '@angular/core';
import { FinanceDataService } from '../../core/services/finance-data.service';

@Component({
  selector: 'app-wallets',
  standalone: true,
  template: `
    <div class="flex-1 max-w-[1440px] mx-auto w-full px-6 md:px-10 py-8 pb-24 md:pb-8 flex flex-col gap-8">
      <h2 class="text-2xl font-semibold text-[#dde4dd]">Wallets</h2>
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        @for (wallet of svc.wallets(); track wallet.id) {
          <div class="p-6 rounded-xl border border-[#3c4a42] bg-[#161d19] hover:border-[#4edea3]/40 transition-colors group">
            <div class="flex justify-between items-start mb-6">
              <div class="w-10 h-10 rounded-lg bg-[#2f3632] flex items-center justify-center text-[#4edea3]">
                <i [class]="'fa-solid ' + wallet.icon"></i>
              </div>
              <span class="text-[10px] font-bold text-[#bbcabf]/40 group-hover:text-[#4edea3]/60 transition-colors">{{ wallet.tag }}</span>
            </div>
            <p class="text-sm font-medium text-[#bbcabf] mb-1">{{ wallet.name }}</p>
            <p class="text-xl font-semibold text-[#dde4dd]">{{ wallet.balance }} PLN</p>
            <p class="text-xs text-[#bbcabf]/60 mt-2">{{ wallet.description }}</p>
          </div>
        }
      </section>
    </div>
  `,
})
export class WalletsPage implements OnInit {
  readonly svc = inject(FinanceDataService);

  ngOnInit() {
    if (!this.svc.wallets().length) this.svc.loadAll();
  }
}
