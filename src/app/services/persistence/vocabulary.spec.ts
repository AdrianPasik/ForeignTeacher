import { TestBed } from '@angular/core/testing';

import { VocabularyParser } from './vocabulary';

describe('VocabularyLoader', () => {
  let service: VocabularyParser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VocabularyParser);
  });

  it('should give empty object on empty content', () => {
    expect(service).toBeTruthy();
    let output = VocabularyParser.load("");
    expect(output.chapters).not.toBe(undefined);
  });

  it('should parse multiple characters, regardless of empty lines', () => {
    let content = `
    Chapter1
    word|wort
    happy|lustig


    Chapter2
    bad|schlecht`;
    let output = VocabularyParser.load(content);
    expect(output.chapters.length).toBe(2);
    expect(output.chapters[0].name).toBe("Chapter1");
    expect(output.chapters[1].name).toBe("Chapter2");
    expect(output.chapters[0].items[0].text).toBe("word");
    expect(output.chapters[0].items[0].foreignText).toBe("wort");
    expect(output.chapters[0].items[0].index).toBe(1);
    expect(output.chapters[0].items[1].text).toBe("happy");
    expect(output.chapters[0].items[1].foreignText).toBe("lustig");
    expect(output.chapters[0].items[1].index).toBe(2);
    expect(output.chapters[1].items[0].text).toBe("bad");
    expect(output.chapters[1].items[0].foreignText).toBe("schlecht");
    expect(output.chapters[1].items[0].index).toBe(1);
  });
  
});
