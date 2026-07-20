import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayResult } from './display-result';

describe('DisplayResult', () => {
  let component: DisplayResult;
  let fixture: ComponentFixture<DisplayResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayResult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
