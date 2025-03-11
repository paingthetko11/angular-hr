import { CommonModule } from '@angular/common';
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
  providers: [ConfirmationService, MessageService],
  templateUrl: './job-opening.component.html',
  styleUrl: './job-opening.component.scss',
})
export class JobOpeningComponent implements OnInit {
  jobopenings: JobOpeningModel[] = [];
  items!: MenuItem[] | undefined;
  selectedJobOpening!: JobOpeningModel;
  isLoading: boolean = false;

  constructor(
    private jobopeningService: JobOpeningService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
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
    ];
  }

  confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this.delete(this.selectedJobOpening);
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'Record deleted',
          });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
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
      this.jobopeningService
        .delete(this.selectedJobOpening.id)
        .subscribe((res) => {
          this.loadata();
        });
    }
  }
}
