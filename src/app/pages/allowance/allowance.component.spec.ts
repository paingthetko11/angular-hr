import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowanceComponent } from './allowance.component';

describe('AllowanceComponent', () => {
  let component: AllowanceComponent;
  let fixture: ComponentFixture<AllowanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllowanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
