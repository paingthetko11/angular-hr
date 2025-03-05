import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import {
  DeductionModel,
  ViDeductionModel,
} from '../../core/models/deduction.model';
import { DeductionService } from '../../core/services/deduction.service';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { RatingModule } from 'primeng/rating';
import { IconFieldModule } from 'primeng/iconfield';

@Component({
  selector: 'app-deduction',
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    //PrimeNg
    TableModule,
    PaginatorModule,
    ButtonModule,
    InputTextModule,
    InputIconModule,
    TagModule,
    SelectModule,
    RatingModule,
    IconFieldModule,
  ],
  templateUrl: './deduction.component.html',
  styleUrl: './deduction.component.scss',
})
export class DeductionComponent implements OnInit {
  deductions: ViDeductionModel[] = [];
  selectedDecution!: ViDeductionModel;

  isloading: boolean = false;

  constructor(
    private deductionSevice: DeductionService,
    private route: Router
  ) {}
  
  ngOnInit(): void {
    this.loadata();
  }

  loadata(): void {
    this.deductionSevice.get().subscribe((res) => {
      this.deductions = res.data as ViDeductionModel[];
      this.isloading = false;
      console.log(this.deductions);
    });
  }

  update(deductions: ViDeductionModel): void {
    this.selectedDecution = deductions;

    this.route.navigate(['deduction/entry', this.selectedDecution.deductionId]);
  }

  delete(deductions: ViDeductionModel): void {
    this.selectedDecution = deductions;
    if (this.selectedDecution !== null) {
      this.deductionSevice
        .delete(this.selectedDecution.deductionId)
        .subscribe((res) => {
          this.loadata();
        });
    }
  }
}
