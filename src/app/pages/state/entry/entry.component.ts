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
import { CookieService } from 'ngx-cookie-service';

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
  cookieData: StateModel[] = [];


  constructor(
    private stateservice: StateService,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}

  private formBuilder = inject(FormBuilder);

  stateForm = this.formBuilder.group({
    stateId: [0],
    stateName: [''],
    stateNameMm: [''],
    
  });

  ngOnInit(): void {
    // this.stateID = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    // console.log(this.stateID);

    // if (this.stateID > 0) {
    //   this.stateservice.getbyID(this.stateID).subscribe((res) => {
    //     this.model = res.data as StateModel;
    //     console.log(this.model);

    //     this.stateForm.controls.stateId.setValue(this.model.stateId);
    //     this.stateForm.controls.stateId.disable();
    //     this.stateForm.controls.stateName.setValue(this.model.stateName);
    //     this.stateForm.controls.stateNameMm.setValue(this.model.stateNameMm);
    //   });
    // }
    this.loadCookies();
  }

  saveToCookie(): void {
    const model: StateModel = {
      stateId: this.stateForm.controls.stateId.value ?? 0,
      stateName: this.stateForm.controls.stateName.value ?? '',
      stateNameMm: this.stateForm.controls.stateNameMm.value ?? '',
    };
  
    let existingCookies = this.cookieService.get('stateForms');
    let stateForms: StateModel[] = existingCookies ? JSON.parse(existingCookies) : [];
  
    stateForms.push(model);
  
    this.cookieService.set('stateForms', JSON.stringify(stateForms));
  
    this.loadCookies();
  }
  
  saveAllCookiesToDatabase(): void {
    let existingCookies = this.cookieService.get('stateForms');
    let stateForms: StateModel[] = existingCookies ? JSON.parse(existingCookies) : [];
  
    if (stateForms.length > 0) {
      for (let model of stateForms) {
        this.stateservice.create(model).subscribe((res) => {
          console.log('Saved to DB:', res);
        });
      }
  
      // After saving all, clear cookies
      this.cookieService.delete('stateForms');
      this.cookieData = [];
  
      console.log('All cookie data saved to database and cookies cleared.');
    } else {
      console.log('No cookie data to save.');
    }
  }

  loadCookies(): void {
    let existingCookies = this.cookieService.get('stateForms');
    this.cookieData = existingCookies ? JSON.parse(existingCookies) : [];
  }
  
}
