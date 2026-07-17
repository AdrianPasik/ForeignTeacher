import { Injectable } from '@angular/core';
import { Progress } from './persistence/progress';
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
        /// 2. If everything is done in chapter, we do 5% chance to repeat
        /// 3. 
        for (const vocabularyChapter of this.vocabulary.chapters) {
            
        }
        return undefined;
    }



    isCorrect(key: string, userInput: string): Answer {
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

    private getVocabularyWord(key: string): string | undefined {
        return "";
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


