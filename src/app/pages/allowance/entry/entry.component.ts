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
    private allowencesService: AllowanceService,
    private route: ActivatedRoute,
    private datepipe: DatePipe
  ) {}

  private formBuilder = inject(FormBuilder);

  allowenceForm = this.formBuilder.group({
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
    this.id = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    console.log(this.id);

    if (this.id > 0) {
      this.allowencesService.getbyID(this.id).subscribe((res) => {
        this.model = res.data as AllowaneModel;
        console.log(this.model);

        this.allowenceForm.controls.allowanceId.setValue(this.model.allowanceId);
        this.allowenceForm.controls.allowanceId.disable();
        this.allowenceForm.controls.companyId.setValue(this.model.companyId);
        this.allowenceForm.controls.branchId.setValue(this.model.branchId);
        this.allowenceForm.controls.deptId.setValue(this.model.deptId);
        this.allowenceForm.controls.positionId.setValue(this.model.positionId);
        this.allowenceForm.controls.allowanceName.setValue(
          this.model.allowanceName
        );
        this.allowenceForm.controls.description.setValue(this.model.description);

        this.allowenceForm.controls.status.setValue(this.model.status);
        this.model.createdOn
          ? this.datepipe.transform(this.model.createdOn, 'yyyy-MM-dd')
          : null;
        this.model.deletedBy
          ? this.datepipe.transform(this.model.createdBy, 'yyyy-MM-dd')
          : null;
        this.allowenceForm.controls.updatedOn.setValue(this.model.updatedOn);
        this.allowenceForm.controls.updatedBy.setValue(this.model.updatedBy);
        this.allowenceForm.controls.deletedOn.setValue(this.model.deletedOn);
        this.allowenceForm.controls.remark.setValue(this.model.remark);
      });
    }
    
    
  }
  submit(): void {
    let createdOn = this.datepipe.transform(
      this.allowenceForm.controls.createdOn.value,
      'yyyy-MM-dd'
    );

    let updatedOn = this.datepipe.transform(
      this.allowenceForm.controls.updatedOn.value,
      'yyyy-MM-dd'
    );

    let deletedOn = this.datepipe.transform(
      this.allowenceForm.controls.deletedOn.value,
      'yyyy-MM-dd'
    );
    var model : AllowaneModel = {
      allowanceId: this.allowenceForm.controls.allowanceId.value?? 0,
      companyId: this.allowenceForm.controls.companyId.value?? '',
      branchId: this.allowenceForm.controls.branchId.value??0,
      deptId: this.allowenceForm.controls.deptId.value??0,
      positionId: this.allowenceForm.controls.positionId.value??0,
      allowanceName: this.allowenceForm.controls.allowanceName.value?? '',
      description: this.allowenceForm.controls.description.value?? '',
      status: this.allowenceForm.controls.status.value?? true,
      createdOn: createdOn?? '',
      createdBy: this.allowenceForm.controls.createdBy.value?? '',
      // updatedOn: updatedOn?? '',
      // updatedBy: this.allowenceForm.controls.updatedBy.value?? '',
      // deletedOn: deletedOn?? '',
      // remark: this.allowenceForm.controls.remark.value?? '',
    }
  }
}