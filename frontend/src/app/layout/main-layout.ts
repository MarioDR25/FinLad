import { Component } from '@angular/core';
import { Sidebar } from './navbar';
import { MobileNav } from './mobile-nav';
import { RouterOutlet } from "@angular/router";



@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [Sidebar, MobileNav, RouterOutlet],
  template: `
    <div class="min-h-screen text-[#dde4dd] pb-1 px-60 bg-white">
      <app-navbar />
      <div class=" w-full py-7 bg-[#f9f9f9] rounded-3xl ">
        <router-outlet />
      </div>
    </div>
    <app-mobile-nav />
  `,
})
export class MainLayout {
  
}
