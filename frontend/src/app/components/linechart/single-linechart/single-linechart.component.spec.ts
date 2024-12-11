import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLinechartComponent } from './single-linechart.component';

describe('SingleLinechartComponent', () => {
  let component: SingleLinechartComponent;
  let fixture: ComponentFixture<SingleLinechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleLinechartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleLinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
