import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="fixed bottom-0 left-0 w-full z-50 flex md:hidden justify-around items-center px-4 pb-4 pt-2 bg-[#216d69]   rounded-t-full">
      
      <a routerLink="/dashboard" class="flex flex-col items-center -mt-8">
        <div class="w-12 h-12 border border-[#216d69] bg-white text-[#00422b] rounded-full flex items-center justify-center text-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table-of-contents-icon lucide-table-of-contents"><path d="M16 5H3"/><path d="M16 12H3"/><path d="M16 19H3"/><path d="M21 5h.01"/><path d="M21 12h.01"/><path d="M21 19h.01"/></svg>
        </div>
        <span class="text-xs mt-1 text-[#bbcabf]">Overview</span>
      </a>
      <a routerLink="/analytics" routerLinkActive="text-[#4edea3]" class="flex flex-col items-center text-[#bbcabf]">
        <i class="fa-solid fa-chart-pie text-lg"></i><span class="text-xs">Analytics</span>
      </a>
      <a routerLink="/transactions" routerLinkActive="text-[#4edea3]" class="flex flex-col items-center text-[#bbcabf]">
        <i class="fa-solid fa-clock-rotate-left text-lg"></i><span class="text-xs">transactions</span>
      </a>
      <a routerLink="/wallets" routerLinkActive="text-[#4edea3]" class="flex flex-col items-center text-[#bbcabf]">
        <i class="fa-solid fa-wallet text-lg"></i><span class="text-xs">Wallets</span>
      </a>
    </nav>
  `,
})
export class MobileNav {}
