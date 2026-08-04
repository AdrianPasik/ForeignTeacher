import { Component, Input, input, Signal, signal } from '@angular/core';
import { Progress } from '../../services/persistence/progress';
import { Learning } from '../../services/learning';
import { DisplayResult } from '../display-result/display-result';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-question-answer',
    imports: [DisplayResult, MatButtonModule],
    templateUrl: './question-answer.html',
    styleUrl: './question-answer.css',
})
export class QuestionAnswer {
    selectedLanguage = input.required<string>();
    learningService = input.required<Learning | null>();
    knownLanguageText = signal('');
    userTranslation = signal('');
    checkAnswerCaption = signal('Check');
    nextQuestionCaption = signal('Next');
    learningMessage = signal('Try next challenge');

    get progressService(): Progress | null {
        return this.learningService()?.progress ?? null;
    }
    onInputChange(event: any): void {
        this.userTranslation.set(event.target.value);
    }

    checkAnswerClick(): void {
        if (this.learningService() == null) {
            console.error('Learning service was not injected properly');
        }
        const realService = <Learning>this.learningService();

        // Empty logic for now
        console.log('Button clicked');
    }

    nextQuestionClick(): void {
        if (this.learningService() == null) {
            console.error('Learning service was not injected properly');
        }
    }
}
