import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  ],
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
  companies: CompanyModel[] = [];
  branches: BranchModel[] = [];
  deparments: DepartmentModel[] = [];
  positions: PositionModel[] = [];
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
    title: [''],
    description: [''],
    noOfApplicants: [0],
    startOn: [''],
    endOn: [''],
    companyId: [''],
    branchId: [0],
    deptId: [0],
    positionId: [0],
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
    }
  }

  submit() {
    console.log('Form Submitted:', this.jobOpeningForm.value);
    if (this.jobOpeningForm.valid) {
      var model: JobOpeningModel = {
        id: this.jobOpeningForm.controls.Id.value ?? 0,
        title: this.jobOpeningForm.controls.title.value ?? '',
        description: this.jobOpeningForm.controls.description.value ?? '',
        noOfApplicants: this.jobOpeningForm.controls.noOfApplicants.value ?? 0,
        startOn: this.jobOpeningForm.controls.startOn.value ?? '',
        endOn: this.jobOpeningForm.controls.endOn.value ?? '',
        companyId: this.jobOpeningForm.controls.companyId.value ?? '',
        branchId: this.jobOpeningForm.controls.branchId.value ?? 0,
        deptId: this.jobOpeningForm.controls.deptId.value ?? 0,
        positionId: this.jobOpeningForm.controls.positionId.value ?? 0,
        openingStatus:
          this.jobOpeningForm.controls.openingStatus.value ?? false,
        createdOn: this.jobOpeningForm.controls.createdOn.value ?? '',
        createdBy: this.jobOpeningForm.controls.createdBy.value ?? '',
        updatedOn: this.jobOpeningForm.controls.updatedOn.value ?? '',
        updatedBy: this.jobOpeningForm.controls.updatedBy.value ?? '',
        deletedOn: this.jobOpeningForm.controls.deletedOn.value ?? '',
        deletedBy: this.jobOpeningForm.controls.deletedBy.value ?? '',
        remark: this.jobOpeningForm.controls.remark.value ?? '',
      };
    }
  }
}
