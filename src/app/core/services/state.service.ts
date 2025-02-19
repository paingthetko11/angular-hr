import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RootModel } from '../models/root.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http:HttpClient) {}
  get(): Observable<RootModel> {
    let url: string = `${}/api/Street`;
    return this.http.get<RootModel>(url);
  }
}
