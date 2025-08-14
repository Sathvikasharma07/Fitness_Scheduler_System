import { Component, OnInit } from '@angular/core';
import { DailyScheduleService } from '../../services/daily-schedule.service';
import { AuthService } from '../../services/auth.service';
import { DailyClass } from '../../models/daily-schedule.model';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {
  classes: DailyClass[] = [];
  userScheduleClassIds: Set<number> = new Set();
  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(
    private dailyScheduleService: DailyScheduleService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadClasses();
    if (this.isAuthenticated) {
      this.loadUserSchedule();
    }
  }

  loadClasses() {
    this.dailyScheduleService.getDailyClasses().subscribe(
      data => {
        this.classes = data;
        console.log('Classes loaded:', data);
      },
      error => {
        console.error('Error loading classes', error);
        alert('Error loading classes: ' + (error.error?.message || 'Unknown error'));
      }
    );
  }

  loadUserSchedule() {
    this.dailyScheduleService.getUserSchedule().subscribe(
      data => {
        this.userScheduleClassIds = new Set(data.map(item => item.daily_class_id));
        console.log('User schedule loaded:', data);
      },
      error => {
        console.error('Error loading user schedule', error);
        // Don't show error if user is not authenticated
        if (error.status !== 401) {
          alert('Error loading your schedule: ' + (error.error?.message || 'Unknown error'));
        }
      }
    );
  }

  isInSchedule(classId: number): boolean {
    return this.isAuthenticated && this.userScheduleClassIds.has(classId);
  }

  removeFromSchedule(classId: number) {
    this.dailyScheduleService.removeFromSchedule(classId).subscribe(
      () => {
        this.userScheduleClassIds.delete(classId);
        alert('Class removed from your schedule!');
      },
      error => {
        console.error('Error removing class from schedule', error);
        alert('Error removing class: ' + (error.error?.message || 'Unknown error'));
      }
    );
  }

  get isAuthenticated(): boolean {
    return this.authService.isLoggedIn();
  }
}