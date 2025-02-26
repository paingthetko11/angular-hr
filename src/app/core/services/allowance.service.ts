import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootModel } from '../models/root.model';
import { environment } from '../../../environments/environment';
import { AllowaneModel } from '../models/allowane.model';

@Injectable({
  providedIn: 'root',
})
export class AllowanceService {
  constructor(private http: HttpClient) {}
  get(): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Allowance`;
    return this.http.get<RootModel>(url);
  }
  getbyID(id: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Allowance/${id}`;
    return this.http.get<RootModel>(url);
  }
  //  getByCB(companyId: string, branchId: number): Observable<RootModel> {
  //   let url: string = `${GLBOAL.BASE_API_V1_URL}/master/allowance/by?`
  //     + `companyId=${companyId}&branchId=${branchId}`;
  //   return this.http.get<RootModel>(url);
  // }
  getByCB():Observable<RootModel>{
    let url: string = `${environment.apiUrl}/api/Allowance/GetByCB`;
    return this.http.get<RootModel>(url);
  }
  create(model: AllowaneModel): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Allowance`;
    return this.http.post<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  update(id: number, model: AllowaneModel): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Allowance
/${id}`;
    return this.http.put<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  delete(id: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Allowance/${id}`;
    return this.http.delete<RootModel>(url);
  }
}
