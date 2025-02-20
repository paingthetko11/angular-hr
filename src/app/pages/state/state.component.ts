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

@Component({
  selector: 'app-state',
  imports: [TableModule, ButtonModule, IconFieldModule, InputIconModule,InputTextModule,FormsModule,CommonModule],
  templateUrl: './state.component.html',
  styleUrl: './state.component.scss',
})
export class StateComponent implements OnInit {
  states: StateModel[] = [];

  constructor(private stateServices: StateService) {}

  ngOnInit(): void {
    this.loaddata();
  }

  loaddata(): void {
    this.stateServices.get().subscribe((res) => {
      this.states = res.data as StateModel[];
    });
  }
}