import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnswerResult } from './question-answer-result';

describe('QuestionAnswerResult', () => {
    let component: QuestionAnswerResult;
    let fixture: ComponentFixture<QuestionAnswerResult>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [QuestionAnswerResult],
        }).compileComponents();

        fixture = TestBed.createComponent(QuestionAnswerResult);
        fixture.componentRef.setInput('success', 'testSuccess');
        fixture.componentRef.setInput('translatedWord', 'testMessage');
        component = fixture.componentInstance;

        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
