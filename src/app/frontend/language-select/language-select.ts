import { CommonModule } from '@angular/common';
import { Component, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vocabulary, VocabularyParser } from '../../services/persistence/vocabulary';
import { QuestionAnswer } from "../question-answer/question-answer";
import { Learning } from '../../services/learning';
import { ProgressLoader } from '../../services/persistence/progress';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.html',
  styleUrl: './language-select.css',
  imports: [CommonModule, QuestionAnswer]
})
export class LanguageSelect {
  private http = inject(HttpClient);

  options: ComboBoxOption[] = [
    { value: 'plde', label: 'PL -> DE' },
    { value: 'plen', label: 'PL -> EN' }
  ];

  selectedLanguageKey = signal(this.options[0].value);

  learning = signal<Learning | null>(null);
  isLoading = signal(false);

  constructor() {
    this.reloadLearning();
  }

  async onSelectionChange(event: Event): Promise<void> {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedLanguageKey.set(value);
    await this.reloadLearning();
  }

  private async reloadLearning(): Promise<void> {
    this.isLoading.set(true);

    try {
      const learning = await this.createLearning(this.selectedLanguageKey());
      this.learning.set(learning);
    } finally {
      this.isLoading.set(false);
    }
  }

  private async createLearning(key: string): Promise<Learning> {
    const text = await firstValueFrom(
      this.http.get(`/vocabulary/${key}.txt`, {
        responseType: 'text'
      })
    );

    const progress = ProgressLoader.load(key);
    const vocabulary = VocabularyParser.load(text);

    return new Learning(progress, vocabulary);
  }
}

interface ComboBoxOption {
  value: string;
  label: string;
}
