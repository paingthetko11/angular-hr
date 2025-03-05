import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOpeningComponent } from './job-opening.component';

describe('JobOpeningComponent', () => {
  let component: JobOpeningComponent;
  let fixture: ComponentFixture<JobOpeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobOpeningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
