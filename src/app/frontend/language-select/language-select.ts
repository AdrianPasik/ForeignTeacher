import { CommonModule } from '@angular/common';
import { Component, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vocabulary, VocabularyParser } from '../../services/persistence/vocabulary';
import { QuestionAnswer } from "../question-answer/question-answer";
import { Learning } from '../../services/learning';
import { ProgressLoader } from '../../services/persistence/progress';

@Component({
  selector: 'app-language-select',
  imports: [CommonModule, QuestionAnswer],
  templateUrl: './language-select.html',
  styleUrl: './language-select.css',
})
export class LanguageSelect {
  private http = inject(HttpClient);
  options: ComboBoxOption[] = [
    { value: 'plde', label: 'PL -> DE' },
    { value: 'test', label: 'PL -> EN' }
  ];
  selectedLanguageKey = signal(this.options[0].value);
  learning: Learning = this.createLearning(this.selectedLanguageKey());
  
  private readonly vocabulary = signal<string>("");

  private loadVocabulary(): void {
    this.http
      .get<string>(`/vocabulary/${this.selectedLanguageKey}.txt`)
      .subscribe(output => {
        this.vocabulary.set(output);
      });
  }

  getVocabulary(): string {
    return this.vocabulary();
  }

  onSelectionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.selectedLanguageKey.set(selectedValue);
  }

  private createLearning(key: string): Learning {
    this.loadVocabulary();
    const progress = ProgressLoader.load(key);
    const vocabulary = VocabularyParser.load(this.getVocabulary());
    return new Learning(progress, vocabulary);
  }
}

interface ComboBoxOption {
  value: string;
  label: string;
}
