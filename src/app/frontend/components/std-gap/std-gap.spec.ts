import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdGap } from './std-gap';

describe('StdGap', () => {
  let component: StdGap;
  let fixture: ComponentFixture<StdGap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StdGap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StdGap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
