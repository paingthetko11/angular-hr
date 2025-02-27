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
  getById(id: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Position/by`;
    return this.http.get<RootModel>(url);
  }
  getByCId(id: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Position/by-companyId`;
    return this.http.get<RootModel>(url);
  }
  getByPId(id: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Position/by-positionId`;
    return this.http.get<RootModel>(url);
  }
  
}
