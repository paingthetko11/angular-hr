import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RootModel } from '../models/root.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient) { }
   get(): Observable<RootModel> {
      let url: string = `${environment.apiUrl}/api/Department`;
      return this.http.get<RootModel>(url);
    }
    getbyID(id: number): Observable<RootModel> {
      let url: string = `${environment.apiUrl}/api/HrDepartment/${id}`;
      return this.http.get<RootModel>(url);
    }
    getbyCID(id: number): Observable<RootModel> {
      let url: string = `${environment.apiUrl}/api/HrDepartment/by`;
      return this.http.get<RootModel>(url);
    }
}
