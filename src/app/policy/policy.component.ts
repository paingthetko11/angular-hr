import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../core/services/policy.service';
import { PolicyModel } from '../core/models/policy.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-policy',
  imports: [
    RouterModule,
    TableModule,
    ButtonModule,
    IconField,
    InputIconModule,
    InputTextModule,
   
  ],

  templateUrl: './policy.component.html',
  styleUrl: './policy.component.scss',
})
export class PolicyComponent implements OnInit {
  selectedPolicy!: PolicyModel;
  policies: PolicyModel[] = [];

  constructor(private policySevices: PolicyService, private route: Router) {}
  ngOnInit(): void {
    this.loaddata();
  }
  loaddata(): void {
    this.policySevices.get().subscribe((res) => {
      this.policies = res.data as PolicyModel[];
    });
  }
  update(policies: PolicyModel): void {
    this.selectedPolicy = policies;
    this.route.navigate(['policy/entity', this.selectedPolicy.id]);
  }

  delete(policies: PolicyModel): void {
    this.selectedPolicy = policies;
    if (this.selectedPolicy !== null) {
      this.policySevices.delete(this.selectedPolicy.id).subscribe((res) => {
        this.loaddata();
      });
    }
  }
}
