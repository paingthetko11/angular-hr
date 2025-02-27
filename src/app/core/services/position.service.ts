import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootModel } from '../models/root.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  constructor(private http: HttpClient) {}
  get(): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Position`;
    return this.http.get<RootModel>(url);
  }
  getByCBDId(companyId : string ,branchId : number ,deptId : number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Position/by?companyid=${companyId}&branchid=${branchId}&$deptId=${deptId}`;
    return this.http.get<RootModel>(url);
  }
  getByCId(companyId : string): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Position/by-companyId?companyId=${companyId}`;
    return this.http.get<RootModel>(url);
  }
  getByPId(id: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Position/by-positionId?id=${id}`;
    return this.http.get<RootModel>(url);
  }
  
}
