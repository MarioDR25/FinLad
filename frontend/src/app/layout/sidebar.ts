import { Component, input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: `
    <aside class="hidden md:flex flex-col h-screen sticky top-0 py-8 bg-[#161d19] border-r border-[#3c4a42] w-64">
      <div class="px-6 mb-10 flex items-center gap-3">
        <div class="w-8 h-8 bg-[#4edea3] rounded flex items-center justify-center">
          <span class="text-[#003824] font-bold text-lg">₣</span>
        </div>
        <div>
          <h1 class="text-xl font-bold text-[#4edea3]">FinLad</h1>
          <p class="text-[10px] uppercase tracking-widest text-[#bbcabf]/60">Wealth Management</p>
        </div>
      </div>
      <nav class="flex-1 space-y-1">
        <a class="bg-[#0566d9] text-[#e6ecff] rounded-lg mx-2 flex items-center gap-3 px-4 py-3">📊<span class="text-sm font-medium">Dashboard</span></a>
        <a class="text-[#bbcabf] hover:bg-[#242c27] rounded-lg mx-2 flex items-center gap-3 px-4 py-3 transition-colors">💳<span class="text-sm font-medium">Wallets</span></a>
        <a class="text-[#bbcabf] hover:bg-[#242c27] rounded-lg mx-2 flex items-center gap-3 px-4 py-3 transition-colors">📈<span class="text-sm font-medium">Analytics</span></a>
        <a class="text-[#bbcabf] hover:bg-[#242c27] rounded-lg mx-2 flex items-center gap-3 px-4 py-3 transition-colors">🧾<span class="text-sm font-medium">Transactions</span></a>
        <a class="text-[#bbcabf] hover:bg-[#242c27] rounded-lg mx-2 flex items-center gap-3 px-4 py-3 transition-colors">⚙️<span class="text-sm font-medium">Settings</span></a>
      </nav>
      <div class="px-6 py-4 mt-auto">
        <div class="flex items-center gap-3 p-2 rounded-lg bg-[#2f3632]/30">
          <div class="w-8 h-8 rounded-full bg-[#4edea3]/20 border border-[#3c4a42] flex items-center justify-center text-sm font-bold text-[#4edea3]">M</div>
          <div class="overflow-hidden">
            <p class="text-sm font-medium text-[#dde4dd] truncate">{{ name() }}</p>
            <p class="text-[10px] text-[#bbcabf] truncate">Premium Member</p>
          </div>
        </div>
      </div>
    </aside>
  `,
})
export class Sidebar {
  name = input('Mario');
}
