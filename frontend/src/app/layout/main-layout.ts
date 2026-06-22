import { Component } from '@angular/core';
import { Sidebar } from './navbar';
import { MobileNav } from './mobile-nav';
import { RouterOutlet } from "@angular/router";



@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [Sidebar, MobileNav, RouterOutlet],
  template: `
    <div class="min-h-screen text-[#dde4dd] bg-white">
      <div class="w-full max-w-350 mx-auto px-4 md:px-8">
        <app-navbar />
        <div class="py-7 bg-[#f9f9f9] rounded-3xl pb-24 md:pb-0">
          <router-outlet />
        </div>
      </div>
    </div>
    <app-mobile-nav />
  `,
})
export class MainLayout {
  
}
