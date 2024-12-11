import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekdayContainerComponent } from './weekday-container.component';

describe('WeekdayContainerComponent', () => {
  let component: WeekdayContainerComponent;
  let fixture: ComponentFixture<WeekdayContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekdayContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeekdayContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
