import { Component } from '@angular/core';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  template: `
    <nav class="fixed bottom-0 left-0 w-full z-50 flex md:hidden justify-around items-center px-4 pb-4 pt-2 bg-[#1a211d] border-t border-[#3c4a42] rounded-t-full">
      <a class="flex flex-col items-center text-[#4edea3] font-bold"><span>🏠</span><span class="text-xs">Home</span></a>
      <a class="flex flex-col items-center text-[#bbcabf]"><span>💳</span><span class="text-xs">Wallets</span></a>
      <a class="flex flex-col items-center -mt-8">
        <div class="w-10 h-10 bg-[#10b981] text-[#00422b] rounded-full flex items-center justify-center text-xl">💬</div>
        <span class="text-xs mt-2  text-[#bbcabf]">AI</span>
      </a>
      <a class="flex flex-col items-center text-[#bbcabf]"><span>🕐</span><span class="text-xs">History</span></a>
    </nav>
  `,
})
export class MobileNav {}
