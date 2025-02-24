import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AllowaneModel } from '../../../core/models/allowane.model';
import { AllowanceService } from '../../../core/services/allowance.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-entry',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ],
  providers: [DatePipe],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
export class EntryComponent implements OnInit {
  id: number = 0;
  model!: AllowaneModel;
  constructor(
    private AllowanceModel: AllowanceService,
    private route: ActivatedRoute,
    private datepipe: DatePipe
  ) {}

  private formBuilder = inject(FormBuilder);

  policyForm = this.formBuilder.group({
    allowanceId: [0],
    companyId: [''],
    branchId: [0],
    deptId: [0],
    positionId: [0],
    allowanceName: [''],
    description: [''],
    status: [true],
    createdOn: [''],
    createdBy: [''],
    updatedOn: [''],
    updatedBy: [''],
    deletedOn: [''],
    deletedBy: [''],
    remark: [''],
  });

  ngOnInit(): void {
    
  }
}
