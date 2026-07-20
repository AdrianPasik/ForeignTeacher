import { Injectable } from '@angular/core';
import { Progress, ProgressItem, ProgressLoader } from './persistence/progress';
import { Vocabulary } from './persistence/vocabulary';

@Injectable({
    providedIn: 'root',
})
export class Learning {
    constructor(
        public progress: Progress,
        public vocabulary: Vocabulary
    ) { }

    getNextPhrase(): NextPhrase | undefined {
        /// We check Vocabulary and then join it with Progress
        /// 1. We go on first failed
        /// 2. If everything is done in chapter, we do 5% chance to repeat random word
        /// 3. If no, we call it a day
        for (const vocabularyChapter of this.vocabulary.chapters) {
            for (const item of vocabularyChapter.items) {
                var result = this.searchProgress(item.text);
                // empty progress meaning user haven't tried it or he did with failure
                if ((result && result.attempt == "1") || !result) {
                    return {
                        text: item.text,
                        foreignPhrase: item.foreignText
                    }
                }
            }
            // not found, 5% chance to repeat
            if (this.checkChance(5)) {
                const randomIndex = Math.floor(Math.random() * vocabularyChapter.items.length);
                const item = vocabularyChapter.items[randomIndex];
                return {
                    text: item.text,
                    foreignPhrase: item.foreignText
                }
            }
        }
        return undefined;
    }

    processAnwer(key: string, userInput: string) {
        const answer = this.isCorrect(key, userInput);
        if (answer.notFound) {
            throw new Error(`Key '${key}' not found`);
        }
        if(answer.correct) {
            const item = this.progress.items.find(element => element.key == key);
            if (!item) {
                this.progress.items.push(new ProgressItem(key, "0", new Date()));
                ProgressLoader.write(this.progress);
                return;
            }
        }
    }


    private searchProgress(key: string): ProgressItem | undefined {
        const item = this.progress.items.find(item => item.key === key);
        return item ?? undefined;
    }

    private isCorrect(key: string, userInput: string): Answer {
        for (const chapter of this.vocabulary.chapters) {
            const item = chapter.items.find(item => key === item.foreignText);
            if (item) {
                const isCorrect = userInput === item.text;
                return {
                    notFound: false,
                    correct: isCorrect,
                };
            }
        }
        return {
            notFound: true,
            correct: false,
        };
    }

    private checkChance(chance: number): boolean {
        return Math.random() < chance / 100;
    }


}

export interface Answer {
    notFound: boolean;
    correct: boolean;
}

export interface NextPhrase {
    text: string;
    foreignPhrase: string;
}


