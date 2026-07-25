import { Component, input } from '@angular/core';
import { Progress } from '../../services/persistence/progress';
import { Learning } from '../../services/learning';

@Component({
  selector: 'app-question-answer',
  imports: [],
  templateUrl: './question-answer.html',
  styleUrl: './question-answer.css',
})
export class QuestionAnswer {
  selectedLanguage = input.required<string>();
  //learning = input.required<Learning>();
}
