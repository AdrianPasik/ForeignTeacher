import { Component, input } from '@angular/core';
import { Vocabulary, VocabularyChapter } from '../../services/persistence/vocabulary';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-vocabulary',
  imports: [CommonModule],
  templateUrl: './view-vocabulary.html',
  styleUrl: './view-vocabulary.css',
})
export class ViewVocabulary {
  vocabulary = input.required<Vocabulary | null>();

  get chapters(): VocabularyChapter[] {
    return this.vocabulary()?.chapters ?? [];
  }
}
