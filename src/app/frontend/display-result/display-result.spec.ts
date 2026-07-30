import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayResult } from './display-result';
import { Progress } from '../../services/persistence/progress';

describe('DisplayResult', () => {
  let component: DisplayResult;
  let fixture: ComponentFixture<DisplayResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayResult);
    fixture.componentRef.setInput("progressService", new Progress("test", []));
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
