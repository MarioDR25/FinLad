import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="fixed bottom-0 left-0 w-full z-50 flex md:hidden justify-around items-center px-4 pb-4 pt-2 bg-[#1a211d] border-t border-[#3c4a42] rounded-t-full">
      
      <a routerLink="/dashboard" class="flex flex-col items-center -mt-8">
        <div class="w-12 h-12 bg-[#10b981] text-[#00422b] rounded-full flex items-center justify-center text-xl">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
        </div>
        <span class="text-xs mt-1 text-[#bbcabf]">Home</span>
      </a>
      <a routerLink="/wallets" routerLinkActive="text-[#4edea3]" class="flex flex-col items-center text-[#bbcabf]">
        <i class="fa-solid fa-wallet text-lg"></i><span class="text-xs">Wallets</span>
      </a>
      <a routerLink="/analytics" routerLinkActive="text-[#4edea3]" class="flex flex-col items-center text-[#bbcabf]">
        <i class="fa-solid fa-chart-pie text-lg"></i><span class="text-xs">Analytics</span>
      </a>
      <a routerLink="/transactions" routerLinkActive="text-[#4edea3]" class="flex flex-col items-center text-[#bbcabf]">
        <i class="fa-solid fa-clock-rotate-left text-lg"></i><span class="text-xs">History</span>
      </a>
    </nav>
  `,
})
export class MobileNav {}
