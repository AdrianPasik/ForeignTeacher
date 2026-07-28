import { Component, Input, input, Signal, signal } from '@angular/core';
import { Progress } from '../../services/persistence/progress';
import { Learning } from '../../services/learning';
import { DisplayResult } from "../display-result/display-result";

@Component({
    selector: 'app-question-answer',
    imports: [DisplayResult],
    templateUrl: './question-answer.html',
    styleUrl: './question-answer.css',
})
export class QuestionAnswer {
    selectedLanguage = input.required<string>();
    learningService = input.required<Learning | null>();
    knownLanguageText = signal("");
    userTranslation = signal("");
    checkAnswerCaption = signal("Check");

    onInputChange(event: any): void {
        this.userTranslation.set(event.target.value);
    }

    onButtonClick(): void {
        if (this.learningService() == null) {
            console.error('Learning service was not injected properly');
        }
        const realService = <Learning>this.learningService();

        // Empty logic for now
        console.log('Button clicked');
    }
}
