import { Component, inject, OnInit } from '@angular/core';
import { PolicyModel } from '../../core/models/policy.model';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Title } from '@angular/platform-browser';
import { PolicyService } from '../../core/services/policy.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-entity',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ],
  providers: [
    DatePipe, // ✅ Added here
  ],
  templateUrl: './entity.component.html',
  styleUrl: './entity.component.scss',
})
export class EntityComponent implements OnInit {
  id: number = 0;
  model!: PolicyModel;

  constructor(
    private policiesService: PolicyService,
    private route: ActivatedRoute,
    private datepipe: DatePipe
  ) {}

  private formBuilder = inject(FormBuilder);

  policyForm = this.formBuilder.group({
    id: [0],
    title: [''],
    description: [''],
    policyType: [0],
    companyId: [''],
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
      this.policiesService.getbyID(this.id).subscribe((res) => {
        this.model = res.data as PolicyModel;
        console.log(this.model);

        this.policyForm.controls.id.setValue(this.model.id);
        this.policyForm.controls.id.disable();
        this.policyForm.controls.title.setValue(this.model.title);
        this.policyForm.controls.description.setValue(this.model.description);
        this.policyForm.controls.policyType.setValue(this.model.policyType);
        this.policyForm.controls.companyId.setValue(this.model.companyId);
        this.model.createdOn
          ? this.datepipe.transform(this.model.createdOn, 'yyyy-MM-dd')
          : null;
        this.model.deletedBy
          ? this.datepipe.transform(this.model.createdBy, 'yyyy-MM-dd')
          : null;
        this.policyForm.controls.updatedOn.setValue(this.model.updatedOn);
        this.policyForm.controls.updatedBy.setValue(this.model.updatedBy);
        this.policyForm.controls.deletedOn.setValue(this.model.deletedOn);
        this.policyForm.controls.remark.setValue(this.model.remark);
      });
    }
  }
  submit(): void {
    let createdOn = this.datepipe.transform(
      this.policyForm.controls.createdOn.value,
      'yyyy-MM-dd'
    );

    let updatedOn = this.datepipe.transform(
      this.policyForm.controls.updatedOn.value,
      'yyyy-MM-dd'
    );

    let deletedOn = this.datepipe.transform(
      this.policyForm.controls.deletedOn.value,
      'yyyy-MM-dd'
    );

    var model: PolicyModel = {
      id: this.policyForm.controls.id.value ?? 0,
      title: this.policyForm.controls.title.value ?? '',
      description: this.policyForm.controls.description.value ?? '',
      policyType: this.policyForm.controls.policyType.value ?? 0,
      companyId: this.policyForm.controls.companyId.value ?? '',
      createdOn: createdOn,
      createdBy: this.policyForm.controls.createdBy.value ?? '',
      updatedOn: updatedOn,
      updatedBy: this.policyForm.controls.createdBy.value ?? '',
      deletedOn: deletedOn,
      deletedBy: this.policyForm.controls.deletedBy.value ?? '',
      remark: this.policyForm.controls.remark.value ?? '',
    };
    if (this.id > 0) {
      this.policiesService.update(this.id,model).subscribe((res) => {
        console.log(res);
      });
    } else {
      this.policiesService.create(model).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
