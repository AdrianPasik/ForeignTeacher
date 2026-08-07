import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-question-answer-result',
    imports: [CommonModule, MatIconModule],
    templateUrl: './question-answer-result.html',
    styleUrl: './question-answer-result.css',
})
export class QuestionAnswerResult {
    success = input.required<boolean>();
    translatedWord = input.required<string>();
}
