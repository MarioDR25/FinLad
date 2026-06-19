import { Component, OnInit, inject } from '@angular/core';
import { FinanceDataService } from '../../core/services/finance-data.service';
import { WalletCard } from "../dashboard/components/wallet-card";

@Component({
  selector: 'app-wallets',
  standalone: true,
  template: `
    <div class="flex-1 max-w-360 mx-auto w-full px-6 md:px-10 py-8 pb-24 md:pb-8 flex flex-col gap-8">
      <h2 class="text-2xl font-semibold text-black">Wallets</h2>
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        @for (wallet of svc.wallets(); track wallet.id) {
          <app-wallet-card [data]="wallet" [showDescription]="true"/>
        }
      </section>
    </div>
  `,
  imports: [WalletCard],
})
export class WalletsPage implements OnInit {
  readonly svc = inject(FinanceDataService);

  ngOnInit() {
    if (!this.svc.wallets().length) this.svc.loadAll();
  }
}
