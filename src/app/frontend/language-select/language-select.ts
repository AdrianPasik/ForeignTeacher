import { CommonModule } from '@angular/common';
import { Component, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vocabulary, VocabularyParser } from '../../services/persistence/vocabulary';
import { QuestionAnswer } from '../question-answer/question-answer';
import { Learning } from '../../services/learning';
import { Progress, ProgressLoader } from '../../services/persistence/progress';
import { firstValueFrom } from 'rxjs';
import { ViewVocabulary } from '../view-vocabulary/view-vocabulary';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DisplayResult } from '../display-result/display-result';
import { Section } from "../components/section/section";
import { StdGap } from "../components/std-gap/std-gap";

@Component({
    selector: 'app-language-select',
    templateUrl: './language-select.html',
    styleUrl: './language-select.css',
    imports: [CommonModule, QuestionAnswer, ViewVocabulary, MatSlideToggleModule, DisplayResult, Section, StdGap],
})
export class LanguageSelect {
    private http = inject(HttpClient);

    options: ComboBoxOption[] = [
        { value: 'plde', label: 'PL -> DE' },
        { value: 'plen', label: 'PL -> EN' },
    ];

    selectedLanguageKey = signal(this.options[0].value);
    vocabularyVisible = signal(false);
    progressVisible = signal(false);
    learning = signal<Learning | null>(null);
    isLoading = signal(false);

    constructor() {
        this.reloadLearning();
    }

    get vocabulary(): Vocabulary | null {
        return this.learning()?.vocabulary ?? null;
    }

    get progress(): Progress | null {
        return this.learning()?.progress ?? null;
    }

    async onSelectionChange(event: Event): Promise<void> {
        const value = (event.target as HTMLSelectElement).value;
        this.selectedLanguageKey.set(value);
        await this.reloadLearning();
    }

    onVocabularyVisibleChange(event: any): void {
        this.vocabularyVisible.set(event.checked);
    }

    onProgressVisibleChange(event: any): void {
        this.progressVisible.set(event.checked);
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
                responseType: 'text',
            }),
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
