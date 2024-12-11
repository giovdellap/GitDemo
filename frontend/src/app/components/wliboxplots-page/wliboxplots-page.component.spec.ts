import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WliboxplotsPageComponent } from './wliboxplots-page.component';

describe('WliboxplotsPageComponent', () => {
  let component: WliboxplotsPageComponent;
  let fixture: ComponentFixture<WliboxplotsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WliboxplotsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WliboxplotsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
