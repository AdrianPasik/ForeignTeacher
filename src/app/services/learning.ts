import { Injectable } from '@angular/core';
import { Progress } from './persistence/progress';
import { Vocabulary } from './persistence/vocabulary';

@Injectable({
  providedIn: 'root',
})
export class Learning {
  constructor(
    public progress:Progress,
    public vocabulary: Vocabulary
  ) {}

  getNextPhrase(): NextPhrase {
    for(const chapter of this.vocabulary.chapters){
      // first find anything which has failed
    }
    throw new Error('Not implemented');
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

  
}

export interface Answer {
  notFound: boolean;
  correct: boolean;
}

export interface NextPhrase {
  text: string;
  foreignPhrase:string;
}


