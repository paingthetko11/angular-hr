import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootModel } from '../models/root.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  get(): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Company`;
    return this.http.get<RootModel>(url);
  }
  getById(id : number): Observable<RootModel>{
    let url: string = `${environment.apiUrl}/api/Company/${id}`;
    return this.http.get<RootModel>(url);
  }
}
