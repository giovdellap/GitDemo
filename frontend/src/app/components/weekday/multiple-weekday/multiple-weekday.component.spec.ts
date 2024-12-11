import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleWeekdayComponent } from './multiple-weekday.component';

describe('MultipleWeekdayComponent', () => {
  let component: MultipleWeekdayComponent;
  let fixture: ComponentFixture<MultipleWeekdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleWeekdayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultipleWeekdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
