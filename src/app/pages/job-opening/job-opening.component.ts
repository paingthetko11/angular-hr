import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { JobOpeningService } from '../../core/services/job-opening.service';
import { JobOpeningModel } from '../../core/models/job-opening.model';

@Component({
  selector: 'app-job-opening',
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

    //primeNg
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TagModule,
    RatingModule,
    SelectModule,
  ],
  templateUrl: './job-opening.component.html',
  styleUrl: './job-opening.component.scss',
})
export class JobOpeningComponent implements OnInit {
  jobopenings: JobOpeningModel[] = [];
  selectedJobOpening!: JobOpeningModel;
  isLoading: boolean = false;

  constructor(
    private jobopeningService: JobOpeningService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadata();
  }
  loadata(): void {
    this.jobopeningService.get().subscribe((res) => {
      this.jobopenings = res.data as JobOpeningModel[];
      this.isLoading = false;
    });
  }
  
  update(allowances: JobOpeningModel): void {
    this.selectedJobOpening = allowances;

    this.router.navigate(['JobOpens/entry', this.selectedJobOpening.id]);
  }

  delete(allowances: JobOpeningModel): void {
    this.selectedJobOpening = allowances;
    if (this.selectedJobOpening !== null) {
      this.jobopeningService
        .delete(this.selectedJobOpening.id)
        .subscribe((res) => {
          this.loadata();
        });
    }
  }
}