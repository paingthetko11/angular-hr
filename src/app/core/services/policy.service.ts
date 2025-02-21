import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RootModel } from '../models/root.model';
import { Observable } from 'rxjs';
import { PolicyModel } from '../models/policy.model';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  constructor(private http: HttpClient) {}

  get(): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrPolicy`;
    return this.http.get<RootModel>(url);
  }
  getbyID(id: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrPolicy/${id}`;
    return this.http.get<RootModel>(url);
  }
  create(model: PolicyModel): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrPolicy`;
    return this.http.post<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  update(id: number, model: PolicyModel): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrPolicy/${id}`;
    return this.http.put<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  delete(id: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrPolicy/${id}`;
    return this.http.delete<RootModel>(url);
  }
}
