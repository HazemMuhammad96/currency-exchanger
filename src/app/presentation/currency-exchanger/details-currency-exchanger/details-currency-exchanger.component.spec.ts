import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCurrencyExchangerComponent } from './details-currency-exchanger.component';

describe('DetailsCurrencyExchangerComponent', () => {
  let component: DetailsCurrencyExchangerComponent;
  let fixture: ComponentFixture<DetailsCurrencyExchangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCurrencyExchangerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCurrencyExchangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
