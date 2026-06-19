import { Component, output } from '@angular/core';

@Component({
  selector: 'app-year-selector',
  imports: [],
  standalone: true,
  template: ` <select
    #yearSelect
    (change)="onChange(yearSelect.value)"
    class="bg-[#216d69] border border-[#3c4a42] rounded-lg px-4 py-2 text-[#dde4dd] text-sm"
  >
    @for (y of years; track y) {
      <option [value]="y" [selected]="y === currentYear">{{ y }}</option>
    }
  </select>`,
})
export class YearSelector {
  
  currentYear = new Date().getFullYear();
  years = Array.from({ length: 3 }, (_, i) => this.currentYear - i);

  year = output<number>();

  onChange(data: string){
    this.year.emit(Number(data))
  }
}
