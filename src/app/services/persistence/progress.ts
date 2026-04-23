import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgressLoader {
  load(text: string): Progress {
    throw new Error();
  }

  write(progress: Progress): string {
    throw new Error();
  }
}

export class Progress {
  constructor(
    public name:string,
    public items: ProgressChapterItem[]
  ) {}
}


export class ProgressChapterItem {
  constructor(
    public index: number, 
    public attempts: boolean[],
    public lastAttempt: string
  ) {
  }
}
