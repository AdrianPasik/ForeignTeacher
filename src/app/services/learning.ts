import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Learning {

  getNextPhrase(): NextPhrase {
    throw new Error('Not implemented');
  }

  
}

export interface Answer {
  correct: boolean;
  hint: string;
}

export interface NextPhrase {
  text: string;
  foreignPhrase:string;
}


