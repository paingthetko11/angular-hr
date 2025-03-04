import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AllowaneModel } from '../../../core/models/allowane.model';
import { AllowanceService } from '../../../core/services/allowance.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Message, MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Editor } from 'primeng/editor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SelectModule } from 'primeng/select';
import { CompanyModel } from '../../../core/models/company.model';
import { CompanyService } from '../../../core/services/company.service';
import { BranchModel } from '../../../core/models/branch.model';
import { BranchService } from '../../../core/services/branch.service';
import { DepartmentModel } from '../../../core/models/department.model';
import { DepartmentService } from '../../../core/services/department.service';
import { PositionModel } from '../../../core/models/position.model';
import { PositionService } from '../../../core/services/position.service';

interface Companies {
  name: string;
  code: string;
}
@Component({
  selector: 'app-entry',
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToggleSwitchModule,
    MessageModule,
    ToastModule,
    SelectModule,
    Editor,
  ],
  providers: [DatePipe, MessageService],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
export class EntryComponent implements OnInit {
  allowanceId: number = 0;
  model!: AllowaneModel;
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
    private allowancesService: AllowanceService,
    private route: ActivatedRoute,
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
  allowanceForm = this.formBuilder.group({
    allowanceId: [0],
    companyId: ['', Validators.required],
    branchId: [0, Validators.required],
    deptId: [0, Validators.required],
    positionId: [0, Validators.required],
    allowanceName: ['', Validators.required],
    description: [''],
    status: [false],
    createdOn: [''],
    createdBy: [''],
    updatedOn: [''],
    updatedBy: [''],
    deletedOn: [''],
    deletedBy: [''],
    remark: [''],
  });

  sanitizeHtml(html: string | null): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html || '');
  }

  ngOnInit(): void {
    this.getCompanies();

    console.log('companies' + this.companies);

    this.allowanceId = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    if (this.allowanceId > 0) {
      this.isEdit = true;
      this.loading = true;

      console.log(this.model);
      this.allowancesService.getbyID(this.allowanceId).subscribe((res) => {
        this.model = res.data as AllowaneModel;
        console.log(this.model);

        this.allowanceForm.controls.allowanceId.setValue(
          this.model.allowanceId
        );
        this.allowanceForm.controls.allowanceId.disable();
        this.allowanceForm.controls.branchId.setValue(this.model.branchId);
        this.allowanceForm.controls.deptId.setValue(this.model.deptId);
        this.allowanceForm.controls.positionId.setValue(this.model.positionId);
        this.allowanceForm.controls.allowanceName.setValue(
          this.model.allowanceName
        );
        this.allowanceForm.controls.description.setValue(
          this.model.description
        );

        this.allowanceForm.controls.status.setValue(this.model.status);
        this.allowanceForm.controls.createdOn.setValue(
          this.model.createdOn
            ? this.datepipe.transform(this.model.createdOn, 'yyyy-MM-dd')
            : null
        );

        this.allowanceForm.controls.createdBy.setValue(this.model.createdBy);
        this.allowanceForm.controls.updatedOn.setValue(
          this.model.updatedOn
            ? this.datepipe.transform(this.model.updatedOn, 'yyyy-MM-dd')
            : null
        );

        this.allowanceForm.controls.updatedBy.setValue(this.model.updatedBy);
        this.allowanceForm.controls.deletedOn.setValue(
          this.model.deletedOn
            ? this.datepipe.transform(this.model.deletedOn, 'yyyy-MM-dd')
            : null
        );
        this.allowanceForm.controls.deletedBy.setValue(this.model.deletedBy);
        this.allowanceForm.controls.remark.setValue(this.model.remark);

        this.getCompanies();
      });
    } else {
      this.onCompanyChange();
    }
    if (!this.isEdit) this.allowanceForm.reset();
    this.allowanceForm.controls.allowanceId.setValue(0);
  }

  getCompanies(): void {
    this.companyService.get().subscribe({
      next: (res) => {
        this.companies = res.data as CompanyModel[];
        if (this.isEdit) {
          this.selectedCompany = this.companies.filter(
            (x) => x.companyId == this.model.companyId
          )[0];
          this.onCompanyChange();
        }
      },
      error: () => {},
    });
  }

  onCompanyChange(): void {
    if (this.selectedCompany !== undefined && this.selectedCompany !== null) {
      this.allowanceForm.controls.companyId.setValue(
        this.selectedCompany.companyId
      );
      this.getBranch(this.selectedCompany.companyId);
      this.errorMessage = [];
    }
  }

  getBranch(companyId: string): void {
    this.branchService.getbyCompanyId(companyId).subscribe({
      next: (res) => {
        this.branches = res.data;
        if (this.isEdit) {
          this.selectedBranch = this.branches.filter(
            (x) => x.branchId == this.model.branchId
          )[0];
          this.OnBranchChange();
        }
      },
      error: () => {},
    });
  }

  OnBranchChange(): void {
    if (this.selectedBranch !== undefined && this.selectedBranch !== null) {
      this.allowanceForm.controls.branchId.setValue(
        this.selectedBranch.branchId
      );
      this.getDept(
        this.selectedCompany.companyId,
        this.selectedBranch.branchId
      );
      this.errorMessage = [];
    }
  }

  getDept(companyId: string, branchId: number): void {
    this.departmentService.getbyCID(companyId, branchId).subscribe({
      next: (res) => {
        this.deparments = res.data;
        if (this.isEdit) {
          this.selectedDepartment = this.deparments.filter(
            (x) => x.deptId == this.model.deptId
          )[0];
          this.OnDeptChange();
        }
      },
      error: () => {},
    });
  }

  OnDeptChange(): void {
    if (
      this.selectedDepartment !== undefined &&
      this.selectedDepartment !== null
    ) {
      this.allowanceForm.controls.deptId.setValue(
        this.selectedDepartment.deptId
      );
      this.getPos(
        this.selectedCompany.companyId,
        this.selectedBranch.branchId,
        this.selectedDepartment.deptId
      );
      this.errorMessage = [];
    }
  }

  getPos(companyId: string, branchId: number, deptId: number): void {
    this.positionService.getByCBDId(companyId, branchId, deptId).subscribe({
      next: (res) => {
        this.positions = res.data;
        if (this.isEdit) {
          this.selectedPosition = this.positions.filter(
            (x) => x.positionId == this.model.positionId
          )[0];
        }
      },
      error: () => {},
    });
  }

  OnPosChange(): void {
    if (this.selectedPosition !== undefined && this.selectedPosition !== null) {
      this.allowanceForm.controls.positionId.setValue(
        this.selectedPosition.positionId
      );
      this.errorMessage = [];
    }
  }

  submit(): void {
    console.log('Form Submitted:', this.allowanceForm.value);
    if (this.allowanceForm.valid) {
      var model: AllowaneModel = {
        allowanceId: this.allowanceForm.controls.allowanceId.value ?? 0,
        companyId: this.allowanceForm.controls.companyId.value ?? '',
        branchId: this.allowanceForm.controls.branchId.value ?? 0,
        deptId: this.allowanceForm.controls.deptId.value ?? 0,
        positionId: this.allowanceForm.controls.positionId.value ?? 0,
        allowanceName: this.allowanceForm.controls.allowanceName.value ?? '',
        description: this.allowanceForm.controls.description.value ?? '',
        status: this.allowanceForm.controls.status.value ?? true,
        createdOn: this.datepipe.transform(
          this.allowanceForm.controls.createdOn.value,
          'yyyy-MM-dd'
        ),
        createdBy: this.allowanceForm.controls.createdBy.value ?? '',
        updatedOn: this.datepipe.transform(
          this.allowanceForm.controls.updatedOn.value,
          'yyyy-MM-dd'
        ),
        deletedOn: this.datepipe.transform(
          this.allowanceForm.controls.updatedOn.value,
          'yyyy-MM-dd'
        ),
        updatedBy: this.allowanceForm.controls.updatedBy.value ?? '',
        deletedBy: this.allowanceForm.controls.deletedBy.value ?? '',
        remark: this.allowanceForm.controls.remark.value ?? '',
      };

      if (!this.isEdit) {
        model.allowanceId = 0;
        model.createdOn = this.datepipe.transform(
          new Date(),
          'yyyy-MM-ddTHH:mm:ss'
        );
        model.createdBy = 'Admin';

        this.isSubmitting = true;
        this.allowancesService.create(model).subscribe({
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
              this.router.navigate(['/allowance']);
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
        model.updatedBy = 'Admin';
        this.allowancesService.update(this.allowanceId, model).subscribe({
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
              this.router.navigate(['/allowance']);
            }
          },
          error: (err) => {
            this.isSubmitting = false;
            console.error('Error:', err);
          },
        });
      }
    } else {
      Object.keys(this.allowanceForm.controls).forEach((field) => {
        const control = this.allowanceForm.get(field);
        control?.markAsDirty({ onlySelf: true });
      });
    }
  }
}
