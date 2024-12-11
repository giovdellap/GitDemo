import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleLinechartComponent } from './multiple-linechart.component';

describe('MultipleLinechartComponent', () => {
  let component: MultipleLinechartComponent;
  let fixture: ComponentFixture<MultipleLinechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleLinechartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultipleLinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
