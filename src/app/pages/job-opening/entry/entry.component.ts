import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Editor, EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { Message, MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitch, ToggleSwitchModule } from 'primeng/toggleswitch';
import { JobOpeningService } from '../../../core/services/job-opening.service';
import { BranchModel } from '../../../core/models/branch.model';
import { CompanyModel } from '../../../core/models/company.model';
import { DepartmentModel } from '../../../core/models/department.model';
import { PositionModel } from '../../../core/models/position.model';
import { JobOpeningModel } from '../../../core/models/job-opening.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { BranchService } from '../../../core/services/branch.service';
import { CompanyService } from '../../../core/services/company.service';
import { DepartmentService } from '../../../core/services/department.service';
import { PositionService } from '../../../core/services/position.service';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';

// export function pastDateValidator(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const today = new Date();
//     const selectedDate = new Date(control.value);

//     if (selectedDate > today) {
//       return { futureDate: true };
//     }
//     return null;
//   };
// }

@Component({
  selector: 'app-entry',
  imports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,

    //primeNg
    InputTextModule,
    ToggleSwitchModule,
    ButtonModule,
    MessageModule,
    ToastModule,
    SelectModule,
    EditorModule,
    DatePickerModule,
  ],
  providers: [DatePipe, MessageService, DatePicker],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
export class EntryComponent implements OnInit {
  jobopeningId: number = 0;
  model!: JobOpeningModel;
  errorMessage!: Message[];
  isSubmitting: boolean = false;
  modalVisible: boolean = false;
  isEdit: boolean = false;
  loading: boolean = false;
  isLoading: boolean = false;
  openingStatus: boolean = false;
  companies: CompanyModel[] = [];
  branches: BranchModel[] = [];
  deparments: DepartmentModel[] = [];
  positions: PositionModel[] = [];
  date: Date | undefined;
  maxDate: Date = new Date();
  minDate: Date = new Date();
  selectedCompany!: CompanyModel;
  selectedBranch!: BranchModel;
  selectedDepartment!: DepartmentModel;
  selectedPosition!: PositionModel;

  constructor(
    private jobOpeningService: JobOpeningService,
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
  jobOpeningForm = this.formBuilder.group({
    Id: [0],
    title: ['', Validators.required],
    description: [''],
    noOfApplicants: [0],
    startOn: [null as Date | null, Validators.required],
    endOn: [null as Date | null, Validators.required],
    companyId: ['', Validators.required],
    branchId: [0, Validators.required],
    deptId: [0, Validators.required],
    positionId: [0, Validators.required],
    openingStatus: [false],
    createdOn: [''],
    createdBy: [''],
    updatedOn: [''],
    updatedBy: [''],
    deletedOn: [''],
    deletedBy: [''],
    remark: [''],
  });

  ngOnInit(): void {
    this.jobopeningId = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    if (this.jobopeningId > 0) {
      this.isEdit = true;
      this.loading = true;

      console.log(this.model);
      this.jobOpeningService.getById(this.jobopeningId).subscribe((res) => {
        this.model = res.data as JobOpeningModel;

        this.jobOpeningForm.controls.Id.setValue(this.model.id);
        this.jobOpeningForm.controls.Id.disable();
        this.jobOpeningForm.controls.title.setValue(this.model.title);
        this.jobOpeningForm.controls.description.setValue(
          this.model.description
        );
        this.jobOpeningForm.controls.noOfApplicants.setValue(
          this.model.noOfApplicants
        );
        this.jobOpeningForm.controls.startOn.setValue(
          this.model.startOn ? new Date(this.model.startOn) : null
        );

        console.log(
          'Transformed startOn:',
          this.datepipe.transform(this.model.startOn, 'yyyy-MM-dd')
        );

        this.jobOpeningForm.controls.endOn.setValue(
          this.model.endOn ? new Date(this.model.endOn) : null
        );

        console.log(
          'Transformed endOn:',
          this.datepipe.transform(this.model.endOn, 'yyyy-MM-dd')
        );
        this.jobOpeningForm.controls.companyId.setValue(this.model.companyId);
        this.jobOpeningForm.controls.branchId.setValue(this.model.branchId);
        this.jobOpeningForm.controls.deptId.setValue(this.model.deptId);
        this.jobOpeningForm.controls.positionId.setValue(this.model.positionId);
        this.jobOpeningForm.controls.openingStatus.setValue(
          this.model.openingStatus
        );
        this.jobOpeningForm.controls.createdOn.setValue(
          this.model.createdOn
            ? this.datepipe.transform(this.model.createdOn, 'yyyy-MM-dd')
            : null
        );

        this.jobOpeningForm.controls.createdBy.setValue(this.model.createdBy);
        this.jobOpeningForm.controls.updatedOn.setValue(
          this.model.updatedOn
            ? this.datepipe.transform(this.model.updatedOn, 'yyyy-MM-dd')
            : null
        );

        this.jobOpeningForm.controls.updatedBy.setValue(this.model.updatedBy);
        this.jobOpeningForm.controls.deletedOn.setValue(
          this.model.deletedOn
            ? this.datepipe.transform(this.model.deletedOn, 'yyyy-MM-dd')
            : null
        );
        this.jobOpeningForm.controls.deletedBy.setValue(this.model.deletedBy);
        this.jobOpeningForm.controls.remark.setValue(this.model.remark);

        this.jobOpeningForm.controls.startOn.disable();

        this.getCompanies();
      });
    } else {
      // Create Mode
      this.isEdit = false;
      this.jobOpeningForm.reset();
      this.jobOpeningForm.controls.Id.setValue(0);
      this.getCompanies();
    }
    if (!this.isEdit) this.jobOpeningForm.reset();
    this.jobOpeningForm.controls.Id.setValue(0);
  }

  //Region Company///
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
      this.branches = [];
      this.deparments = [];
      this.positions = [];
      this.selectedBranch != null;
      this.selectedDepartment != null;
      this.selectedPosition != null;

      this.jobOpeningForm.controls.companyId.setValue(
        this.selectedCompany.companyId
      );
      this.getBranch(this.selectedCompany.companyId);
      this.errorMessage = [];
    }
  }
  //end region

  // Region Branch
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
      this.deparments = [];
      this.positions = [];
      this.selectedDepartment != null;
      this.selectedPosition != null;
      this.jobOpeningForm.controls.branchId.setValue(
        this.selectedBranch.branchId
      );
      this.getDept(
        this.selectedCompany.companyId,
        this.selectedBranch.branchId
      );
      this.errorMessage = [];
    }
  }
  // End Region

  //Region Department//
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
      this.positions = [];
      this.selectedPosition != null;

      this.jobOpeningForm.controls.deptId.setValue(
        this.selectedDepartment.deptId
      );
      this.getPosition(
        this.selectedCompany.companyId,
        this.selectedBranch.branchId,
        this.selectedDepartment.deptId
      );
      this.errorMessage = [];
    }
  }
  //End Region

  //Region Position//
  getPosition(companyId: string, branchId: number, deptId: number): void {
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

  onPositionChange(): void {
    if (this.selectedPosition !== undefined && this.selectedPosition !== null) {
      this.jobOpeningForm.controls.positionId.setValue(
        this.selectedPosition.positionId
      );
      this.errorMessage = [];
    }
  }
  //end Region

  // Submit//

  submit() {
    console.log('Form Submitted:', this.jobOpeningForm.value);
    if (this.jobOpeningForm.valid) {
      const startdate = new Date(
        this.jobOpeningForm.controls.startOn.value ?? ''
      );
      const enddate = new Date(this.jobOpeningForm.controls.endOn.value ?? '');

      if (startdate < enddate) {
        var model: JobOpeningModel = {
          id: this.jobOpeningForm.controls.Id.value ?? 0,
          title: this.jobOpeningForm.controls.title.value ?? '',
          description: this.jobOpeningForm.controls.description.value ?? '',
          noOfApplicants:
            this.jobOpeningForm.controls.noOfApplicants.value ?? 0,
          startOn: this.jobOpeningForm.controls.startOn.value
            ? this.datepipe.transform(
                this.jobOpeningForm.controls.startOn.value,
                'yyyy-MM-dd'
              )
            : '',

          endOn: this.jobOpeningForm.controls.endOn.value
            ? this.datepipe.transform(
                this.jobOpeningForm.controls.endOn.value,
                'yyyy-MM-dd'
              )
            : '',
          companyId: this.jobOpeningForm.controls.companyId.value ?? '',
          branchId: this.jobOpeningForm.controls.branchId.value ?? 0,
          deptId: this.jobOpeningForm.controls.deptId.value ?? 0,
          positionId: this.jobOpeningForm.controls.positionId.value ?? 0,
          openingStatus:
            this.jobOpeningForm.controls.openingStatus.value ?? false,
          createdOn: this.datepipe.transform(
            this.jobOpeningForm.controls.createdOn.value,
            'yyyy-MM-dd'
          ),
          createdBy: this.jobOpeningForm.controls.createdBy.value ?? '',
          updatedOn: this.datepipe.transform(
            this.jobOpeningForm.controls.updatedOn.value,
            'yyyy-MM-dd'
          ),
          deletedOn: this.datepipe.transform(
            this.jobOpeningForm.controls.updatedOn.value,
            'yyyy-MM-dd'
          ),
          updatedBy: this.jobOpeningForm.controls.updatedBy.value ?? '',
          deletedBy: this.jobOpeningForm.controls.deletedBy.value ?? '',
          remark: this.jobOpeningForm.controls.remark.value ?? '',
        };

        if (!this.isEdit) {
          model.id = 0;
          model.createdOn = this.datepipe.transform(
            new Date(),
            'yyyy-MM-ddTHH:mm:ss'
          );
          model.createdBy = 'Admin';

          this.isSubmitting = true;
          this.jobOpeningService.create(model).subscribe({
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
                this.router.navigate(['/JobOpens']);
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
          this.jobOpeningService.update(this.jobopeningId, model).subscribe({
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
                this.router.navigate(['/JobOpens']);
              }
            },
            error: (err) => {
              this.isSubmitting = false;
              console.error('Error:', err);
            },
          });
        }
      } else {
        console.log('End date is greather than Start Date');
        this.messageService.add({
          key: 'globalMessage',
          severity: 'error',
          summary: 'End Date is Greather than Start Date',
        });
      }
    } else {
      Object.keys(this.jobOpeningForm.controls).forEach((field) => {
        const control = this.jobOpeningForm.get(field);
        control?.markAsDirty({ onlySelf: true });
      });
    }
  }
}
