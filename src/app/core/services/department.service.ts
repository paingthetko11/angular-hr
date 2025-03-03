import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RootModel } from '../models/root.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}
  get(): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Department`;
    return this.http.get<RootModel>(url);
  }
  getbyID(id: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Deparment/${id}`;
    return this.http.get<RootModel>(url);
  }
  getbyCID(companyId: string, branchId: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Deparment/by?companyid=${companyId}&branchid=${branchId}`;
    return this.http.get<RootModel>(url);
  }
  getbyName(
    deptName: string,
    companyId: string,
    branchId: number
  ): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrDepartment/byName?deptName=${deptName}&companyId=${companyId}&branchId=${branchId}`;
    return this.http.get<RootModel>(url);
  }
}
