import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StateComponent } from '../state.component';
import { StateService } from '../../../core/services/state.service';
import { StateModel } from '../../../core/models/state.model';
import { ActivatedRoute } from '@angular/router';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-entry',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
export class EntryComponent implements OnInit {
  stateID: number = 0;

  model!: StateModel;

  constructor(
    private stateservice: StateService,
    private route: ActivatedRoute
  ) {}

  private formBuilder = inject(FormBuilder);

  stateForm = this.formBuilder.group({
    stateId: [0],
    stateName: [''],
    stateNameMm: [''],
  });

  ngOnInit(): void {
    this.stateID = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    console.log(this.stateID);

    if (this.stateID > 0) {
      this.stateservice.getbyID(this.stateID).subscribe((res) => {
        this.model = res.data as StateModel;
        console.log(this.model);

        this.stateForm.controls.stateId.setValue(this.model.stateId);
        this.stateForm.controls.stateId.disable();
        this.stateForm.controls.stateName.setValue(this.model.stateName);
        this.stateForm.controls.stateNameMm.setValue(this.model.stateNameMm);
      });
    }
  }

  submit(): void {
    var model: StateModel = {
      stateId: this.stateForm.controls.stateId.value ?? 0,
      stateName: this.stateForm.controls.stateName.value ?? '',
      stateNameMm: this.stateForm.controls.stateNameMm.value ?? '',
    };
    if (this.stateID > 0) {
      this.stateservice.update(this.stateID,model).subscribe((res) => {
        console.log(res);
      });
    } else {
      this.stateservice.create(model).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
