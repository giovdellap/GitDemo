import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleWeekdayComponent } from './single-weekday.component';

describe('SingleWeekdayComponent', () => {
  let component: SingleWeekdayComponent;
  let fixture: ComponentFixture<SingleWeekdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleWeekdayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleWeekdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
