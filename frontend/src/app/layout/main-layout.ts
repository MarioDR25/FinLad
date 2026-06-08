import { Component } from '@angular/core';
import { Sidebar } from './sidebar';
import { MobileNav } from './mobile-nav';
import { RouterOutlet } from "@angular/router";



@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [Sidebar, MobileNav, RouterOutlet],
  template: `
    <div class="flex min-h-screen bg-[#0e1511] text-[#dde4dd]">
      <app-sidebar />
      <router-outlet />
    </div>
    <app-mobile-nav />
  `,
})
export class MainLayout {
  
}
