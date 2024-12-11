import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupPageComponent } from './setup-page.component';

describe('SetupPageComponent', () => {
  let component: SetupPageComponent;
  let fixture: ComponentFixture<SetupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
