import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUiComponent } from './product-ui.component';

describe('ProductUiComponent', () => {
  let component: ProductUiComponent;
  let fixture: ComponentFixture<ProductUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
