import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  getPluginDetail(id: number): Observable<any> {
    return this.http.get(`/api/plugin/${id}`);
  }

  getAllPlugins(): Observable<any> {
    return this.http.get(`/api/plugin`);
  }

  constructor(private http: HttpClient) { }
}
