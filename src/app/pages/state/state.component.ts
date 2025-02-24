import { Component, OnInit } from '@angular/core';
import { StateService } from '../../core/services/state.service';
import { StateModel } from '../../core/models/state.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-state',
  imports: [
    RouterModule,
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    CommonModule,
  ],
  templateUrl: './state.component.html',
  styleUrl: './state.component.scss',
})
export class StateComponent implements OnInit {
  selectedState!: StateModel;
  states: StateModel[] = [];

  constructor(private stateServices: StateService, private route: Router) {}

  ngOnInit(): void {
    this.loaddata();
  }

  loaddata(): void {
    this.stateServices.get().subscribe((res) => {
      this.states = res.data as StateModel[];
    });
  }

  update(state: StateModel): void {
    this.selectedState = state;
    this.route.navigate(['state/entry', this.selectedState.stateId]);
  }

  delete(state: StateModel): void {
    this.selectedState = state;
    if (this.selectedState !== null) {
      this.stateServices.delete(this.selectedState.stateId).subscribe((res) => {
        this.loaddata();
      });
    }
  }
}
