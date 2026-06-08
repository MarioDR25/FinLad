import { Component, inject } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-ai-input',
  standalone: true,
  template: `
    <section class="relative">
      <div class="absolute -inset-0.5 bg-linear-to-r from-[#4edea3]/20 to-[#adc6ff]/20 rounded-full blur opacity-20"></div>
      <div class="relative flex items-center bg-[#1a211d] rounded-full px-6 py-4 border border-[#3c4a42] focus-within:border-[#4edea3] transition-all">
        <span class="text-[#4edea3] mr-4 text-lg">✨</span>
        <input class="w-full bg-transparent border-none outline-none text-base text-[#dde4dd] placeholder-[#bbcabf]/40"
          placeholder="Describe tu movimiento... (ej: 'gasté 45 zl en comida con mi tarjeta')" type="text"/>
        <button class="ml-4 w-10 h-10 rounded-full bg-[#4edea3] text-[#003824] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform text-lg">➤</button>
      </div>
    </section>
  `,
})
export class AiInput {
  private dashboardService = inject(DashboardService);

  
}
