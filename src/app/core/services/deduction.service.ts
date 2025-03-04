import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootModel } from '../models/root.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeductionService {
  constructor(private http: HttpClient) {}

  get(): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Deduction`;
    return this.http.get<RootModel>(url);
  }
  getByCBDPId(
    companyId: string,
    branchId: number,
    deptId: number,
    positionId: number
  ): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Deduction/by?companyid=${companyId}&branchid=${branchId}&depId=${deptId}&positionId=${positionId}`;
    return this.http.get<RootModel>(url);
  }
  getById(id: string): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Deduction/${id}`;
    return this.http.get<RootModel>(url);
  }
  getByDeptId(deptId: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Deduction/by-deptId?deptId=${deptId}`;
    return this.http.get<RootModel>(url);
  }
}
