import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VocabularyLoader {
  parseVocabulary(text:string): Vocabulary{
    const lines = text.split('\n').filter(line => line.trim() !== '');
    var result = new Vocabulary();
    for(const rawLine of lines) {
      const line = rawLine.trim();
      if(line.includes('|')) {
        result.addLineToLastChapter(line);
      } else {
        result.chapters.push(new VocabularyChapter(line));
      }
    }
    return result;
  }
}

export class Vocabulary {
  constructor() {
    this.chapters = [];
  }

  addLineToLastChapter(line: string) {
    const values = line.split('|');
    var lastChapter = this.chapters.at(-1);
    if (lastChapter == undefined){
      throw new Error('Something is wrong with language feed')
    }
    lastChapter.items.push(new VocabularyItem(values[0], values[1]));
  }
  chapters!:VocabularyChapter[];
}

export class VocabularyChapter {
  name!:string;
  items!:VocabularyItem[];
  constructor(name: string) {
    this.name = name;
    this.items = [];
  }
}

export class VocabularyItem {
  constructor(text: string, foreignText: string) {
    this.text = text;
    this.foreignText = foreignText;
  }
  text!:string;
  foreignText!: string;
}
