import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Editor, EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { Message, MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { DeductionModel } from '../../../core/models/deduction.model';
import { DeductionService } from '../../../core/services/deduction.service';
import { MessageService } from 'primeng/api';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CompanyService } from '../../../core/services/company.service';
import { BranchService } from '../../../core/services/branch.service';
import { DepartmentService } from '../../../core/services/department.service';
import { PositionService } from '../../../core/services/position.service';
import { CompanyModel } from '../../../core/models/company.model';
import { BranchModel } from '../../../core/models/branch.model';
import { DepartmentModel } from '../../../core/models/department.model';
import { PositionModel } from '../../../core/models/position.model';

@Component({
  selector: 'app-entry',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,

    // Primeng
    InputTextModule,
    ButtonModule,
    ToggleSwitchModule,
    MessageModule,
    ToastModule,
    SelectModule,
    EditorModule,
  ],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
export class EntryComponent implements OnInit {
  deductionId: number = 0;
  model!: DeductionModel;
  errorMessage!: Message[];
  isSubmitting: boolean = false;
  modalVisible: boolean = false;
  isEdit: boolean = false;
  loading: boolean = false;
  isLoading: boolean = false;
  companies: CompanyModel[] = [];
  branches: BranchModel[] = [];
  deparments: DepartmentModel[] = [];
  positions: PositionModel[] = [];
  selectedCompany!: CompanyModel;
  selectedBranch!: BranchModel;
  selectedDepartment!: DepartmentModel;
  selectedPosition!: PositionModel;

  constructor(
    private route: ActivatedRoute,
    private deductionService: DeductionService,
    private datepipe: DatePipe,
    private messageService: MessageService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private companyService: CompanyService,
    private branchService: BranchService,
    private departmentService: DepartmentService,
    private positionService: PositionService
  ) {}

  private formBuilder = inject(FormBuilder);
  deductionForm = this.formBuilder.group({
    deductionId: [0],
    companyId: ['', Validators.required],
    branchId: [0, Validators.required],
    deptId: [0, Validators.required],
    deductionName: ['', Validators.required],
    description: [''],
    isDefault: [false],
    status: [false],
    createdOn: [''],
    createdBy: [''],
    updatedOn: [''],
    updatedBy: [''],
    deletedOn: [''],
    deletedBy: [''],
    remark: [''],
  });

  ngOnInit(): void {
    this.deductionId = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    if (this.deductionId > 0) {
      this.isEdit = true;
      this.loading = true;

      console.log(this.model);
      this.deductionService.getById(this.deductionId).subscribe((res) => {
        this.model = res.data as DeductionModel;
        console.log(this.model);

        this.deductionForm.controls.deductionId.setValue(
          this.model.deductionId
        );
        this.deductionForm.controls.deductionId.disable();
        this.deductionForm.controls.companyId.setValue(this.model.companyId);
        this.deductionForm.controls.branchId.setValue(this.model.branchId);
        this.deductionForm.controls.deptId.setValue(this.model.deptId);

        this.deductionForm.controls.deductionName.setValue(
          this.model.deductionName
        );
        this.deductionForm.controls.description.setValue(
          this.model.description
        );

        this.deductionForm.controls.isDefault.setValue(this.model.isDefault);

        this.deductionForm.controls.status.setValue(this.model.status);
        this.deductionForm.controls.createdOn.setValue(
          this.model.createdOn
            ? this.datepipe.transform(this.model.createdOn, 'yyyy-MM-dd')
            : null
        );

        this.deductionForm.controls.createdBy.setValue(this.model.createdBy);
        this.deductionForm.controls.updatedOn.setValue(
          this.model.updatedOn
            ? this.datepipe.transform(this.model.updatedOn, 'yyyy-MM-dd')
            : null
        );

        this.deductionForm.controls.updatedBy.setValue(this.model.updatedBy);
        this.deductionForm.controls.deletedOn.setValue(
          this.model.deletedOn
            ? this.datepipe.transform(this.model.deletedOn, 'yyyy-MM-dd')
            : null
        );
        this.deductionForm.controls.deletedBy.setValue(this.model.deletedBy);
        this.deductionForm.controls.remark.setValue(this.model.remark);
      });
    }
  }

  

  sanitizeHtml(html: string | null): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html || '');
  }

  Submit(): void {
    console.log('Form Submitted:', this.deductionForm.value);
    if (this.deductionForm) {
      var model: DeductionModel = {
        deductionId: this.deductionForm.controls.deductionId.value ?? 0,
        companyId: this.deductionForm.controls.companyId.value ?? '',
        branchId: this.deductionForm.controls.branchId.value ?? 0,
        deptId: this.deductionForm.controls.deptId.value ?? 0,
        deductionName: this.deductionForm.controls.deductionName.value ?? '',
        description: this.deductionForm.controls.description.value ?? '',
        isDefault: this.deductionForm.controls.isDefault.value ?? false,
        status: this.deductionForm.controls.status.value ?? false,
        createdOn: this.datepipe.transform(
          this.deductionForm.controls.createdOn.value,
          'yyyy-MM-dd'
        ),
        createdBy: this.deductionForm.controls.createdBy.value ?? '',
        updatedOn: this.datepipe.transform(
          this.deductionForm.controls.updatedOn.value,
          'yyyy-MM-dd'
        ),
        updatedBy: this.deductionForm.controls.updatedBy.value ?? '',
        deletedOn: this.datepipe.transform(
          this.deductionForm.controls.deletedOn.value,
          'yyyy-MM-dd'
        ),
        deletedBy: this.deductionForm.controls.deletedBy.value ?? '',
        remark: this.deductionForm.controls.remark.value ?? '',
      };

      if (this.isEdit) {

        /// Create///
        model.deductionId = 0;
        model.createdOn = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
        model.createdBy = 'Admin';
        this.isSubmitting = true;
        this.deductionService.create(model).subscribe({
          next: (res) => {
            console.log('API Response:', res);
            if (res.success) {
              this.modalVisible = false;

              this.messageService.add({
                severity: 'info',
                summary: 'Success',
                detail: 'Successfully Created',
              });

              this.loading = false;
              this.router.navigate(['/deducion']);
            }
          },
          error: (err) => {
            this.isSubmitting = false;
            console.error('Error:', err);
          },
        });
      } else {
        model.updatedOn = this.datepipe.transform(
          new Date(),
          'yyyy-MM-ddTHH:mm:ss'
        );

        /// Update///
        model.updatedBy = 'Admin';
        this.deductionService.update(this.deductionId,model).subscribe({
          next: (res) => {
            console.log('API Response:', res);
            if (res.success) {
              this.modalVisible = false;

              this.messageService.add({
                severity: 'info',
                summary: 'Success',
                detail: 'Successfully Update',
              });
              this.loading = false;
              this.router.navigate(['/deduction']);
            }
          },
          error: (err) => {
            this.isSubmitting = false;
            console.error('Error:', err);
          },
        })
      }
    } 
    // else {
    //   Object.keys(this.deductionForm.controls).forEach((field) => {
    //     const control = this.deductionForm.get(field);
    //     control?.markAsDirty({ onlySelf: true });
    //   });
    // }
  }
}
