import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingtimePageComponent } from './loadingtime-page.component';

describe('LoadingtimePageComponent', () => {
  let component: LoadingtimePageComponent;
  let fixture: ComponentFixture<LoadingtimePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingtimePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingtimePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
