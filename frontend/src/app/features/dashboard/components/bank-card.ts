import { Component } from '@angular/core';

@Component({
  selector: 'app-bank-card',
  standalone: true,
  imports: [],
  template: `
    <!-- MAIN CARD CONTAINER (Proporción exacta 16:9 gracias a w-80 y h-45) -->
    <div class="relative w-95 h-50 shadow-lg select-none rounded-3xl">
      
      <!-- BACKGROUND: SVG con proporciones idénticas al DIV padre -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 160" class="absolute inset-0 block w-full h-full">
        <defs>
          <!-- Máscara de recorte nativa con esquinas redondeadas de 20px -->
          <clipPath id="card-radius">
            <rect width="310" height="160" rx="20" ry="20" />
          </clipPath>
        </defs>

        <!-- El grupo <g> aplica el recorte redondeado a todo lo que lleva dentro -->
        <g clip-path="url(#card-radius)">
          <!-- Fondo principal de la tarjeta (#216d69) -->
          <rect width="320" height="180" fill="#216d69" />
          
          <!-- Triángulo 1: Oscuro (#26716d) -> Clavado en la esquina (320, 180) -->
          <path d="M 20,180 L 320,180 L 320,-80 Z" fill="#26716d"/>
          
          <!-- Triángulo 2: Medio (#307773) -> Clavado en la esquina (320, 180) -->
          <path d="M 80,180 L 320,180 L 320,-20 Z" fill="#307773" filter="drop-shadow(-3px -3px 4px rgba(0,0,0,0.15))"/>
          
          <!-- Triángulo 3: Claro (#41827e) -> Clavado en la esquina (320, 180) -->
          <path d="M 140,180 L 320,180 L 320,40 Z" fill="#41827e" filter="drop-shadow(-3px -3px 4px rgba(0,0,0,0.15))"/>
        </g>
      </svg>

      <!-- FOREGROUND: Capa de contenido (Textos y datos) -->
      <div class="relative z-10 w-full h-full p-5 flex flex-col justify-between text-white font-sans">
        
        <!-- Fila Superior -->
        <div class="flex justify-between items-start">
          <span class="text-lg font-bold tracking-widest uppercase">FinŁad</span>
        </div>

        <!-- Fila Central -->
        <div class="flex flex-col gap-1">
          <span class="text-xs font-light text-zinc-300 tracking-wider uppercase">Total Balance</span>
          <span class="text-2xl font-semibold tracking-wide">{{ totalBalance() }}</span>
        </div>

        <!-- Fila Inferior -->
        <div class="flex justify-between items-end">
          <span class="text-xs font-medium tracking-widest uppercase">Mario Ivan Daza</span>
        </div>

      </div>
    </div>
  `
})
export class BankCardComponent {
  
  totalBalance(): string {
    return '€1,250.50';
  }

}