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
import { CookieService } from 'ngx-cookie-service';

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
    FormsModule,
  ],
  providers: [CookieService],
  templateUrl: './state.component.html',
  styleUrl: './state.component.scss',
})
export class StateComponent implements OnInit {
  selectedState!: StateModel;
  states: StateModel[] = [];
  cookies: { name: string; value: string }[] = [];
  newCookieName = '';
  newCookieValue = '';


  constructor(private stateServices: StateService, private route: Router) { }

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

  loadCookies(): void {
    const allCookies = document.cookie.split('; ').filter(c => c);
    this.cookies = allCookies.map(cookieStr => {
      const [name, ...rest] = cookieStr.split('=');
      return {
        name,
        value: decodeURIComponent(rest.join('='))
      };
    });
  }

  addCookie(): void {
    if (this.newCookieName && this.newCookieValue) {
      document.cookie = `${this.newCookieName}=${encodeURIComponent(this.newCookieValue)}; path=/`;
      this.newCookieName = '';
      this.newCookieValue = '';
      this.loadCookies();
    }
  }

  deleteCookie(name: string): void {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    this.loadCookies();
  }

  // addSampleCookies(): void {
  //  const sampleCookies = [
  
  //     { name: 'notification', value: 'enabled' }
  //   ]; 
  
  //   sampleCookies.forEach(c => {
  //     document.cookie = `${c.name}=${encodeURIComponent(c.value)}; path=/`;
  //   });
  
  //   this.loadCookies();
  // }
}
