import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokensboxplotComponent } from './tokensboxplot.component';

describe('TokensboxplotComponent', () => {
  let component: TokensboxplotComponent;
  let fixture: ComponentFixture<TokensboxplotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokensboxplotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TokensboxplotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
