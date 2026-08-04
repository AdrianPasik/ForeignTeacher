import { TestBed } from '@angular/core/testing';

import { Learning } from './learning';
import { Vocabulary } from './persistence/vocabulary';
import { Progress } from './persistence/progress';

describe('Learning', () => {
    let service: Learning;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        let vocabulary = new Vocabulary();
        let progress = new Progress('test', []);
        service = new Learning(progress, vocabulary);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
