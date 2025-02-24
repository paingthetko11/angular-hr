import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Button, ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { AllowanceService } from '../../core/services/allowance.service';
import { AllowaneModel } from '../../core/models/allowane.model';

@Component({
  selector: 'app-allowance',
  imports: [
    RouterModule,
    FormsModule,
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    CommonModule,
    TagModule,
    RatingModule,
  ],
  templateUrl: './allowance.component.html',
  styleUrl: './allowance.component.scss',
})
export class AllowanceComponent {
  allowances: AllowaneModel[] = [];

  constructor(private allowanceService: AllowanceService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.allowanceService.get().subscribe((res) => {
      this.allowances = res.data as AllowaneModel[];
    });
  }
}

