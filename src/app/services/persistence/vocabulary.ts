import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VocabularyLoader {
  load(text:string): Vocabulary{
    const lines = text.split('\n').filter(line => line.trim() !== '');
    var result = new Vocabulary();
    var lineNumber:number = 1;
    for(const rawLine of lines) {
      const line = rawLine.trim();
      if(line.includes('|')) {
        result.addLineToLastChapter(lineNumber, line);
        lineNumber++;
      } else {
        result.chapters.push(new VocabularyChapter(line));
        lineNumber = 1;
      }
    }
    return result;
  }
}
/*
EN(known language) -> DE(learned language) example
1
word|wort
happy|lustig

IMPORTANT - first word is always in known language
*/

export class Vocabulary {
  constructor() {
    this.chapters = [];
  }

  addLineToLastChapter(lineNumber: number, line: string) {
    const values = line.split('|');
    var lastChapter = this.chapters.at(-1);
    if (lastChapter == undefined){
      throw new Error('Something is wrong with language feed')
    }
    lastChapter.items.push(new VocabularyItem(lineNumber, values[0], values[1]));
  }
  chapters!:VocabularyChapter[];
}

export class VocabularyChapter {
  items!:VocabularyItem[];
  constructor(public name: string) {
    this.items = [];
  }
}

export class VocabularyItem {
  constructor(
    public index: number, 
    public text: string, 
    public foreignText: string) {
  }
}
