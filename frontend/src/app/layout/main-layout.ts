import { Component } from '@angular/core';
import { Sidebar } from './navbar';
import { MobileNav } from './mobile-nav';
import { RouterOutlet } from "@angular/router";



@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [Sidebar, MobileNav, RouterOutlet],
  template: `
    <div class="min-h-screen text-[#dde4dd] py-4 ">
      <app-navbar />
      <div class="flex-1 w-full p-4">
        <router-outlet />
      </div>
    </div>
    <app-mobile-nav />
  `,
})
export class MainLayout {
  
}
