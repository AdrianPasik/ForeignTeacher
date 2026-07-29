import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVocabulary } from './view-vocabulary';
import { Vocabulary } from '../../services/persistence/vocabulary';

describe('ViewVocabulary', () => {
  let component: ViewVocabulary;
  let fixture: ComponentFixture<ViewVocabulary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewVocabulary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVocabulary);
    fixture.componentRef.setInput("vocabulary", new Vocabulary());
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
