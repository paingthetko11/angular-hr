import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Button, ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { AllowanceService } from '../../core/services/allowance.service';
import { AllowaneModel } from '../../core/models/allowane.model';
import { Select, SelectModule } from 'primeng/select';
import { CompanyModel } from '../../core/models/company.model';
import { CookieService } from 'ngx-cookie-service';

interface Companies {
  name: string;
  code: string;
}



@Component({
  selector: 'app-allowance',
  providers: [CookieService],
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,

    //PrimeNG
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TagModule,
    RatingModule,
    SelectModule,
  ],
  templateUrl: './allowance.component.html',
  styleUrl: './allowance.component.scss',
})
export class AllowanceComponent {
  allowances: AllowaneModel[] = [];
  selectedAllowance!: AllowaneModel;

  isLoading: boolean = false;
  companies: Companies[] | undefined;
  selectedCompany!: CompanyModel;
  cookieValue: string;

  inputKey: string = ''; // To store the cookie key
  inputValue: string = ''; // To store the cookie value
  cookies: { key: string; value: string }[] = [];


  constructor(
    private allowanceService: AllowanceService,
    private route: Router,
    private cookieService: CookieService
  ) {
    this.cookieService.set('Test', 'Hello World');
    this.cookieValue = this.cookieService.get('Test');
  }


  ngOnInit(): void {
    this.loadData();
    this.loadAllCookies()
  }

  loadData(): void {
    this.allowanceService.get().subscribe((res) => {
      this.allowances = res.data as AllowaneModel[];
      this.isLoading = false;
      console.log(this.allowances);
    });
  }

  saveCookie(): void {
    if (this.inputKey.trim() && this.inputValue.trim()) {
      const expirationDate = new Date();
      expirationDate.setSeconds(expirationDate.getSeconds() + 50); // Set expiration to 5 seconds from now
      this.cookieService.set(this.inputKey, this.inputValue, { expires: expirationDate });
      console.log(`Cookie set: ${this.inputKey} = ${this.inputValue}`);

      // Clear the input fields
      this.inputKey = '';
      this.inputValue = '';

      // Reload all cookies
      this.loadAllCookies();
    } else {
      console.log('Key or value is empty. Please enter both.');
    }
  }

  loadAllCookies(): void {
    // Get all cookies and store them in the `cookies` array
    this.cookies = [];
    const allCookies = this.cookieService.getAll();
    for (const key in allCookies) {
      this.cookies.push({ key, value: allCookies[key] });
    }
  }

  deleteCookie(key: string): void {
    // Delete the specified cookie
    this.cookieService.delete(key);
    console.log(`Cookie deleted: ${key}`);

    // Reload all cookies
    this.loadAllCookies();
  }

  clearAllCookies(): void {
    // Delete all cookies
    this.cookieService.deleteAll();
    console.log('All cookies deleted.');

    // Reload all cookies
    this.loadAllCookies();
  }

  checkCookieStatus(): void {
    const allCookies = this.cookieService.getAll();
    this.cookies = this.cookies.map((cookie) => ({
      key: cookie.key,
      value: allCookies[cookie.key] || 'Expired',
    }));
  }


  update(allowances: AllowaneModel): void {
    this.selectedAllowance = allowances;

    this.route.navigate([
      'allowance/entry',
      this.selectedAllowance.allowanceId,
    ]);
  }

  delete(allowances: AllowaneModel): void {
    this.selectedAllowance = allowances;
    if (this.selectedAllowance !== null) {
      this.allowanceService
        .delete(this.selectedAllowance.allowanceId)
        .subscribe((res) => {
          this.loadData();
        });
    }
  }
}
