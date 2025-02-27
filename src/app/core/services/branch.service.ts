import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RootModel } from '../models/root.model';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http:HttpClient) { }
   get(): Observable<RootModel> {
      let url: string = `${environment.apiUrl}/api/HrBranch`;
      return this.http.get<RootModel>(url);
    }
  
    getbyID(id: number): Observable<RootModel> {
      let url: string = `${environment.apiUrl}/api/HrBranch/${id}`;
      return this.http.get<RootModel>(url);
    }
    getbyCompanyId(companyId : string): Observable<RootModel> {
      let url: string = `${environment.apiUrl}/api/HrBranch/?companyId=${companyId}`;
      return this.http.get<RootModel>(url);
    }
}
