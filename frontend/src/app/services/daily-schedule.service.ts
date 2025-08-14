import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DailyClass, UserSchedule } from '../models/daily-schedule.model';

@Injectable({
  providedIn: 'root'
})
export class DailyScheduleService {
  private apiUrl = 'http://localhost:3000/api/schedule';

  constructor(private http: HttpClient) { }

  getDailyClasses(date?: string): Observable<DailyClass[]> {
    const url = date ? `${this.apiUrl}/daily-classes/${date}` : `${this.apiUrl}/daily-classes`;
    return this.http.get<DailyClass[]>(url);
  }

  createSpecificClass(classData: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/specific-classes`, classData, this.getHttpOptions());
  }

  getSpecificClasses(date: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/specific-classes/date/${date}`);
  }

  getSpecificUserSchedule(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/specific-classes/my-schedule`, this.getHttpOptions());
  }

  getUserSchedule(): Observable<UserSchedule[]> {
    return this.http.get<UserSchedule[]>(`${this.apiUrl}/my-schedule`, this.getHttpOptions());
  }

  addToSchedule(dailyClassId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/my-schedule`, { dailyClassId }, this.getHttpOptions());
  }

  removeFromSchedule(dailyClassId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/my-schedule/${dailyClassId}`, this.getHttpOptions());
  }



  addToSpecificSchedule(classId: number): Observable<any> {
    return this.http.post(`http://localhost:3000/api/specific-classes/my-schedule`, { classId }, this.getHttpOptions());
  }

  removeFromSpecificSchedule(scheduleId: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/specific-classes/my-schedule/${scheduleId}`, this.getHttpOptions());
  }



  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
  }



}