import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Class } from '../models/class.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private apiUrl = 'http://localhost:3000/api/classes';

  constructor(private http: HttpClient) { }

  getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(this.apiUrl, this.getHttpOptions());
  }

  createClass(newClass: Class): Observable<Class> {
    return this.http.post<Class>(this.apiUrl, newClass, this.getHttpOptions());
  }

  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }
}