import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Button, ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { AllowanceService } from '../../core/services/allowance.service';
import { AllowaneModel } from '../../core/models/allowane.model';
import { Select, SelectModule } from 'primeng/select';
import { CompanyModel } from '../../core/models/company.model';

interface Companies {
  name: string;
  code: string;
}

@Component({
  selector: 'app-allowance',
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,

    //PrimeNG
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TagModule,
    RatingModule,
    SelectModule,
  ],
  templateUrl: './allowance.component.html',
  styleUrl: './allowance.component.scss',
})
export class AllowanceComponent {
  allowances: AllowaneModel[] = [];
  selectedAllowance!: AllowaneModel;

  isLoading: boolean = false;
  companies: Companies[] | undefined;
  selectedCompany!: CompanyModel;

  constructor(
    private allowanceService: AllowanceService,
    private route: Router
  ) {}

  
  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.allowanceService.get().subscribe((res) => {
      this.allowances = res.data as AllowaneModel[];
      this.isLoading = false;
      console.log(this.allowances);
    });
  }

  update(allowances: AllowaneModel): void {
    this.selectedAllowance = allowances;

    this.route.navigate([
      'allowance/entry',
      this.selectedAllowance.allowanceId,
    ]);
  }

  delete(allowances: AllowaneModel): void {
    this.selectedAllowance = allowances;
    if (this.selectedAllowance !== null) {
      this.allowanceService
        .delete(this.selectedAllowance.allowanceId)
        .subscribe((res) => {
          this.loadData();
        });
    }
  }
}
