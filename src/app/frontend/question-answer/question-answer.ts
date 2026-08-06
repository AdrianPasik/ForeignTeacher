import { Component, input, signal } from '@angular/core';
import { Progress } from '../../services/persistence/progress';
import { Learning } from '../../services/learning';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { QuestionAnswerResult } from "../question-answer-result/question-answer-result";

@Component({
    selector: 'app-question-answer',
    imports: [QuestionAnswerResult, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
    templateUrl: './question-answer.html',
    styleUrl: './question-answer.css',
})
export class QuestionAnswer {
    selectedLanguage = input.required<string>();
    learningService = input.required<Learning | null>();
    answerResultVisible = signal(false);
    knownLanguageCaption = signal("Translate: ");
    knownLanguageText = signal('TestPLToken');
    userTranslation = signal('');
    checkAnswerButtonCaption = signal('Check');
    nextQuestionButtonCaption = signal('Next');
    repeatQuestionThisChapterButtonCaption = signal('Repeat chapter');
    repeatQuestionRandomChapterButtonCaption = signal('Repeat item across chapters');
    nextQuestionSuccess = signal(false);
    nextQuestionMessage = signal('TestMessage2');
    learningMessage = signal('Translate this word');


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
        console.log('Button clicked');
    }

    repeatQuestionThisChapter(): void {
        if (this.learningService() == null) {
            console.error('Learning service was not injected properly');
        }
        console.log('Button clicked');
    }

    repeatQuestionRandomChapter(): void {
        if (this.learningService() == null) {
            console.error('Learning service was not injected properly');
        }
        console.log('Button clicked');
    }


}
