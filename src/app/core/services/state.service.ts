import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RootModel } from '../models/root.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StateModel } from '../models/state.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor(private http: HttpClient) {}

  get(): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/State`;
    return this.http.get<RootModel>(url);
  }

  getbyID(id: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/State/${id}`;
    return this.http.get<RootModel>(url);
  }

  create(model: StateModel): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/State`;
    return this.http.post<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  update(id: number, model: StateModel): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/State/${id}`;
    return this.http.put<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  delete(id: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/State/${id}`;
    return this.http.delete<RootModel>(url);
  }
}
