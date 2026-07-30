import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnswer } from './question-answer';
import { Progress } from '../../services/persistence/progress';
import { Vocabulary } from '../../services/persistence/vocabulary';
import { Learning } from '../../services/learning';

describe('QuestionAnswer', () => {
  let component: QuestionAnswer;
  let fixture: ComponentFixture<QuestionAnswer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionAnswer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionAnswer);
    fixture.componentRef.setInput("selectedLanguage", "plde");
    const progress = new Progress("test", []);
    const vocabulary = new Vocabulary();
    fixture.componentRef.setInput("learningService", new Learning(progress, vocabulary));
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
