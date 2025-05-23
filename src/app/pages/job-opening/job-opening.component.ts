import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { JobOpeningService } from '../../core/services/job-opening.service';
import { JobOpeningModel } from '../../core/models/job-opening.model';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ExportService } from '../../core/services/export.service';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-job-opening',
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

    //primeNg
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TagModule,
    RatingModule,
    SelectModule,
    SplitButtonModule,
    ConfirmDialogModule,
  ],
  providers: [DatePipe,ConfirmationService, MessageService],
  templateUrl: './job-opening.component.html',
  styleUrl: './job-opening.component.scss',
})
export class JobOpeningComponent implements OnInit {
  @ViewChild(Table) tblDeduction!: Table;
  jobopenings: JobOpeningModel[] = [];
  items!: MenuItem[] | undefined;
  selectedJobOpening!: JobOpeningModel;
  isLoading: boolean = false;

  constructor(
    private jobopeningService: JobOpeningService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private exportService: ExportService
  ) {
    this.items = [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.update(this.selectedJobOpening),
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.delete(this.selectedJobOpening),
      },
      {
        label: 'Excel',
        icon: 'pi pi-file-excel',
        command: () => this.excel(),
      },
    ];
  }

  ngOnInit(): void {
    this.loadata();
  }
  loadata(): void {
    this.jobopeningService.get().subscribe((res) => {
      this.jobopenings = res.data as JobOpeningModel[];
      this.isLoading = false;
    });
  }

  create(): void {
    this.router.navigate(['JobOpens/entry']);
  }

  update(jobopenings: JobOpeningModel): void {
    this.selectedJobOpening = jobopenings;

    this.router.navigate(['JobOpens/entry', this.selectedJobOpening.id]);
  }

  delete(jobopenings: JobOpeningModel): void {
    this.selectedJobOpening = jobopenings;
    if (this.selectedJobOpening !== null) {
      this.confirmationService.confirm({
        message: 'Are You Sure Want To Delete?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.jobopeningService
            .delete(this.selectedJobOpening.id)
            .subscribe((res) => {
              this.messageService.add({
                key: 'globalMessage',
                severity: 'success',
                summary: 'Confirmed',
                detail: res.message,
              });
              this.loadata();
              // Deselect
              this.selectedJobOpening = null as any;
            });
        },
        reject: () => {
          this.selectedJobOpening = null as any;
        },
        key: 'jobOpeningDialog',
      });
    } else {
      this.messageService.add({
        key: 'globalMessage',
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please Select JobOpening',
      });
    }
  }

  excel(): void {
    this.exportService.excel('JobOpens', this.tblDeduction.tableViewChild);
  }
  
}
