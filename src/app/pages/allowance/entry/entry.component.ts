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
import {
  AllowaneModel,
  ViAllowanceModel,
} from '../../../core/models/allowane.model';
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
  model!: ViAllowanceModel;
  errorMessage!: Message[];
  isSubmitting: boolean = false;
  modalVisible: boolean = false;
  isEdit: boolean = false;
  loading: boolean = false;
  isLoading: boolean = false;
  companies: CompanyModel[] = [];
  selectedCompany!: CompanyModel;

  constructor(
    private allowancesService: AllowanceService,
    private route: ActivatedRoute,
    private datepipe: DatePipe,
    private messageService: MessageService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private companyService: CompanyService
  ) {}

  private formBuilder = inject(FormBuilder);
  allowanceForm = this.formBuilder.group({
    allowanceId: [0, Validators.required],
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
    this.allowanceId = parseInt(this.route.snapshot.paramMap.get('id') ?? '');

    if (this.allowanceId > 0) {
      this.isEdit = true;
      this.loading = true;

      this.allowancesService.getbyID(this.allowanceId).subscribe((res) => {
        console.log('API Response:', res); // Debugging

        if (res && res.data) {
          this.model = res.data as ViAllowanceModel;
          console.log('Model Data:', this.model);

          this.allowanceForm.controls.allowanceId.setValue(
            this.model.allowanceId
          );
          this.allowanceForm.controls.allowanceId.disable();
          this.allowanceForm.controls.companyId.setValue(this.model.companyId);
          this.allowanceForm.controls.branchId.setValue(this.model.branchId);
          // this.allowanceForm.controls.companyId.setValue(this.model.companyId);
          this.allowanceForm.controls.deptId.setValue(this.model.deptId);
          this.allowanceForm.controls.positionId.setValue(
            this.model.positionId
          );
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

          this.getCompanies(); // Call after model is assigned
        } else {
          console.error('API response does not contain expected data:', res);
        }
      });
    }
  }

  getCompanies(): void {
    this.companyService.get().subscribe({
      next: (res) => {
        this.companies = res.data || [];
        console.log('Companies:', this.companies);

        if (this.isEdit && this.model) {
          // Ensure model is defined
          this.selectedCompany =
            this.companies.find((x) => x.companyId == this.model.companyId) ||
            ({} as CompanyModel);

          this.onCompanyChange();
        }
      },
      error: (err) => {
        console.error('Error fetching companies:', err);
      },
    });
  }

  onCompanyChange(): void {
    if (this.selectedCompany !== undefined && this.selectedCompany !== null) {
      this.allowanceForm.controls.companyId.setValue(
        this.selectedCompany.companyId
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
