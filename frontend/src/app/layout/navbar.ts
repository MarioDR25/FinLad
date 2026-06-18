import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StorageService } from '../core/services/storage.service';
import { AuthService } from '../features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="flex w-full sticky  justify-between py-2">
      <div class="px-6 pb-1 flex items-center gap-3  text-[#216d69]">
        <i class="fa-solid fa-chart-simple text-3xl"></i>
        <h1 class="text-3xl font-bold ">FinŁad</h1>
      </div>
      <nav class="flex ">
        <a routerLink="/dashboard" routerLinkActive="bg-[#216d69] text-white" class="text-[#216d69]  rounded-lg  flex items-center gap-3 px-6" [routerLinkActiveOptions]="{exact:true}">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-dashboard-icon lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
          <span class="text-sm font-bold">Overview</span>
        </a>
        <a routerLink="/analytics" routerLinkActive="bg-[#216d69] text-white" class=" text-[#216d69]  rounded-lg  flex items-center gap-3 px-6  ">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-spline-icon lucide-chart-spline"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7"/></svg>
          <span class="text-sm font-bold">Analytics</span>
        </a>
        <a routerLink="/transactions" routerLinkActive="bg-[#216d69] text-white" class="text-[#216d69]  rounded-lg  flex items-center gap-3 px-6  ">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-clock-icon lucide-file-clock"><path d="M16 22h2a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v2.85"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M8 14v2.2l1.6 1"/><circle cx="8" cy="16" r="6"/></svg>
          <span class="text-sm font-bold">Transactions</span>
        </a>
        <a routerLink="/wallets" routerLinkActive="bg-[#216d69] text-white" class="text-[#216d69]  rounded-lg  flex items-center gap-3 px-6  ">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wallet-cards-icon lucide-wallet-cards"><path d="M3 11h3.75a2 2 0 0 1 1.6.8l.45.6a4 4 0 0 0 6.4 0l.45-.6a2 2 0 0 1 1.6-.8H21"/><path d="M3 7h18"/><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
          <span class="text-sm font-bold">Wallets</span>
        </a>
      </nav>
      <div class="px-6 ">
        <div class="flex items-center gap-3 p-2 text-black">
          <div >
            <p class="text-lg font-medium text-[#216d69]">{{ userName }}</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-user-round-icon lucide-square-user-round"><path d="M18 21a6 6 0 0 0-12 0"/><circle cx="12" cy="11" r="4"/><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
          <button (click)="onLogout()" type="button" aria-label="Log out">
            <i class="fa-solid fa-arrow-right-from-bracket text-black text-xl cursor-pointer"></i>
          </button>
        </div>
      </div>
    </aside>
  `,
})
export class Sidebar {
  private storageService = inject(StorageService);
  private authService = inject(AuthService);

  userName = this.storageService.get('user')
  
  onLogout(){
    this.authService.logout();
  }
}
