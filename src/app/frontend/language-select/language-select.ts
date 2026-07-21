import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-language-select',
  imports: [CommonModule],
  templateUrl: './language-select.html',
  styleUrl: './language-select.css',
})
export class LanguageSelect {

  options: ComboBoxOption[] = [
    { value: 'plde', label: 'PL -> DE' }
  ];
  selectedOption = signal('');


  onSelectionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.selectedOption.set(selectedValue);
  }
}

interface ComboBoxOption {
  value: string;
  label: string;
}
