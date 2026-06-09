import { Component, inject, input } from '@angular/core';
import { StorageService } from '../core/services/storage.service';
import { AuthService } from '../features/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: `
    <aside class="hidden md:flex flex-col h-screen sticky top-0 py-8 bg-[#161d19] border-r border-[#3c4a42] w-64">
      <div class="px-6 mb-10 flex items-center gap-3">
     
          <i class="fa-solid fa-hand-holding-dollar  text-[#31a575] text-3xl"></i>
        
        <div>
          <h1 class="text-2xl font-bold text-[#31a575]">FinŁad</h1>
          <p class="text-[10px] uppercase tracking-widest text-[#bbcabf]/60">Smart Finance</p>
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
          <div class="overflow-hidden mr-4">
            <p class="text-sm font-medium text-[#dde4dd] truncate">{{ userName }}</p>
            <p class="text-[10px] text-[#bbcabf] truncate">Member</p>
          </div>
          <button  (click)="onLogout()"  type="button" aria-label="Log out">
            <i class="fa-solid fa-arrow-right-from-bracket text-[#dde4dd] text-xl cursor-pointer"></i>
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
