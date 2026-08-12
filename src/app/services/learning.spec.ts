import { TestBed } from '@angular/core/testing';

import { Learning } from './learning';
import { Vocabulary, VocabularyChapter, VocabularyItem } from './persistence/vocabulary';
import { Progress } from './persistence/progress';

describe('Learning', () => {
    let service: Learning;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        let vocabulary = new Vocabulary();
        vocabulary.chapters.push(new VocabularyChapter("1"));
        vocabulary.chapters[0].items.push(new VocabularyItem(1, "test", "testForeign"));
        let progress = new Progress('test', []);
        service = new Learning(progress, vocabulary);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return undefined on wrong translation', () => {
        const answer = service.checkAnswer("wrongKey", "wrongValue");
        expect(answer.notFound).toBeTruthy();
    });

    it('should return found on right translation', () => {
        const answer = service.checkAnswer("test", "testForeign");
        expect(answer.correct).toBeTruthy();
        expect(answer.notFound).toBeFalsy();
    });

    it('should give next quiz when progress is empty', () => {
        const nextQuiz = service.getNextQuiz();
        expect(nextQuiz).toBeTruthy();
        expect(nextQuiz?.chapter).toBe("1");
        expect(nextQuiz?.text).toBe("test");
        expect(nextQuiz?.foreignPhrase).toBe("testForeign");
    });
});
